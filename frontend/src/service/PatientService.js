import axios from 'axios';

class PatientService {
    static BASE_URL = 'http://localhost:8080';
    
    static async loginUser(login, password) {
        const response = await axios.post(`${PatientService.BASE_URL}/login`, {
            login,
            password
        });
        return response.data;
    }

    static async registerUser(userData) {
        const response = await axios.post(`${PatientService.BASE_URL}/register`, userData);
        return response.data;
    }

    static async getAllDoctors(token) {
        const response = await axios.get(`${PatientService.BASE_URL}/doctors`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async bookAppointment(appointmentData, token) {
        const response = await axios.post(`${PatientService.BASE_URL}/appointments`, appointmentData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
    
    static async rateDoctor(doctorId, rating, token) {
        const response = await axios.put(
            `${PatientService.BASE_URL}/doctors/${doctorId}/rate?rating=${rating}`, 
            {}, 
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }    

    static async getCurrentUserAppointments(token) {
        const response = await axios.get(`${PatientService.BASE_URL}/appointments/my-appointments`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }    
    
    static async cancelAppointment(appointmentId, token) {
        const response = await axios.delete(`${PatientService.BASE_URL}/appointments/${appointmentId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async markAppointmentCompleted(appointmentId, token) {
        const response = await axios.put(
            `${PatientService.BASE_URL}/appointments/${appointmentId}/status?appointmentStatus=COMPLETED`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }
}

export default PatientService;
