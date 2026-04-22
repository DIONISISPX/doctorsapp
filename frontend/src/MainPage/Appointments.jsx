import { useState, useEffect } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
    createViewWeek,
    createViewMonthGrid,
    createViewMonthAgenda,
} from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import './Appointments.css';
import PatientService from '../service/PatientService';

export default function Appointments() {
    const [events, setEvents] = useState(() => {
        const cachedEvents = localStorage.getItem('cachedEvents');
        return cachedEvents ? JSON.parse(cachedEvents) : [];
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentToken, setCurrentToken] = useState(localStorage.getItem('token'));
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const calendarApp = useCalendarApp({
        views: [
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        events: events,
        defaultView: 'week',
        dayBoundaries: {
            start: '08:00',
            end: '18:00',
        },
        theme: {
            primary: 'hsla(218, 76%, 38%, 0.926)',
            secondary: '#f8fafc',
            accent: 'hsla(218, 76%, 38%, 0.926)',
            background: '#ffffff',
            highlight: 'hsla(218, 55.30%, 42.90%, 0.74)',
            text: '#333333',
        }
    });

    useEffect(() => {
        if (calendarApp) {
            calendarApp.events.set(events);
        }
    }, [events, calendarApp]);

    useEffect(() => {
        const newToken = localStorage.getItem('token');
        if (newToken !== currentToken) {
            localStorage.removeItem('cachedEvents');
            setCurrentToken(newToken);
            setEvents([]);
            fetchAppointments(newToken);
        }
    }, [currentToken]);

    const fetchAppointments = async (token) => {
        if (!token) {
            setError("No authentication token found");
            setIsLoading(false);
            return;
        }

        try {
            const userAppointments = await PatientService.getCurrentUserAppointments(token);
            const doctorsList = await PatientService.getAllDoctors(token);

            // Process appointments and mark past ones as completed
            const processedAppointments = await Promise.all(
                userAppointments.map(async (appointment) => {
                    const startDate = new Date(
                        appointment.startTime[0],
                        appointment.startTime[1] - 1,
                        appointment.startTime[2],
                        appointment.startTime[3],
                        appointment.startTime[4]
                    );
                    const endDate = new Date(
                        appointment.endTime[0],
                        appointment.endTime[1] - 1,
                        appointment.endTime[2],
                        appointment.endTime[3],
                        appointment.endTime[4]
                    );

                    // Mark as completed if appointment is past and still scheduled
                    if (appointment.status === 'SCHEDULED' && endDate < new Date()) {
                        try {
                            await PatientService.markAppointmentCompleted(appointment.id, token);
                            return { ...appointment, status: 'COMPLETED' };
                        } catch (err) {
                            console.error("Failed to mark appointment as completed:", err);
                            return appointment;
                        }
                    }
                    return appointment;
                })
            );

            // Filter only scheduled appointments for display
            const scheduledAppointments = processedAppointments.filter(
                appointment => appointment.status === 'SCHEDULED'
            );

            const transformedEvents = scheduledAppointments.map(appointment => {
                const matchingDoctor = doctorsList.find(doctor => doctor.id === appointment.doctorId);
                const doctorName = matchingDoctor ? matchingDoctor.fullName : "Unknown Doctor";

                const startDate = new Date(
                    appointment.startTime[0],
                    appointment.startTime[1] - 1,
                    appointment.startTime[2],
                    appointment.startTime[3],
                    appointment.startTime[4]
                );

                const endDate = new Date(
                    appointment.endTime[0],
                    appointment.endTime[1] - 1,
                    appointment.endTime[2],
                    appointment.endTime[3],
                    appointment.endTime[4]
                );

                return {
                    id: appointment.id.toString(),
                    title: `Appointment with ${doctorName} (${appointment.reason})`,
                    start: formatDateTimeForCalendar(startDate),
                    end: formatDateTimeForCalendar(endDate),
                    rawData: appointment // Store the original data for reference
                };
            });

            setEvents(transformedEvents);
            localStorage.setItem('cachedEvents', JSON.stringify(transformedEvents));
        } catch (err) {
            console.error("Failed to fetch appointments:", err);
            setError("Failed to fetch appointments. Please try again.");
            localStorage.removeItem('cachedEvents');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchAppointments(token);
    }, []);

    const formatDateTimeForCalendar = (date) => {
        const adjustedDate = new Date(date);
        adjustedDate.setHours(adjustedDate.getHours() + 3);
        
        return `${adjustedDate.getFullYear()}-${padZero(adjustedDate.getMonth() + 1)}-${padZero(adjustedDate.getDate())} ${padZero(adjustedDate.getHours())}:${padZero(adjustedDate.getMinutes())}`;
    };

    const padZero = (num) => num.toString().padStart(2, '0');

    const sortAppointmentsByDate = (appointments) => {
        return [...appointments].sort((a, b) => {
            const dateA = new Date(a.start);
            const dateB = new Date(b.start);
            return dateA - dateB;
        });
    };

    const handleCancelClick = (event, appointment) => {
        event.stopPropagation();
        setSelectedAppointment(appointment);
        setShowConfirmModal(true);
    };

    const handleConfirmCancel = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("No authentication token found");
            }

            await PatientService.cancelAppointment(selectedAppointment.id, token);
            
            const updatedEvents = events.filter(event => event.id !== selectedAppointment.id);
            setEvents(updatedEvents);
            localStorage.setItem('cachedEvents', JSON.stringify(updatedEvents));
            
            if (calendarApp) {
                calendarApp.events.remove(selectedAppointment.id);
            }
            
            setError("");
        } catch (err) {
            console.error("Failed to cancel appointment:", err);
            setError("Failed to cancel appointment. Please try again.");
        } finally {
            setShowConfirmModal(false);
            setSelectedAppointment(null);
        }
    };

    if (isLoading && events.length === 0) {
        return <div className="appointments-container">Loading appointments...</div>;
    }

    return (
        <div className="appointments-page">
            <div className="appointments-container">
                {error && <p className="error-message">{error}</p>}
                <ScheduleXCalendar calendarApp={calendarApp} />
            </div>
            <div className="appointments-list">
                <h2>Upcoming Appointments</h2>
                {events.length === 0 ? (
                    <p>No appointments scheduled</p>
                ) : (
                    <ul>
                        {sortAppointmentsByDate(events).map(event => (
                            <li key={event.id} className="appointment-item">
                                <div className="appointment-content">
                                    <div className="appointment-date">
                                        {new Date(event.start).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                    <div className="appointment-time">
                                        {new Date(event.start).toLocaleTimeString('en-GB', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                    <div className="appointment-title">
                                        {event.title}
                                    </div>
                                </div>
                                <button 
                                    className="cancel-button"
                                    onClick={(e) => handleCancelClick(e, event)}
                                    title="Cancel Appointment"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Cancel Appointment</h3>
                        <p>Are you sure you want to cancel this appointment?</p>
                        <div className="modal-buttons">
                            <button 
                                className="modal-button confirm"
                                onClick={handleConfirmCancel}
                            >
                                Yes, Cancel
                            </button>
                            <button 
                                className="modal-button cancel"
                                onClick={() => {
                                    setShowConfirmModal(false);
                                    setSelectedAppointment(null);
                                }}
                            >
                                No, Keep
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}