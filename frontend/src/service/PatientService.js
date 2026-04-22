import axios from 'axios';

class PatientService {
    static BASE_URL = 'http://localhost:8080';
    
    static async loginUser(login, password) {
        try {
            const response = await axios.post(`${PatientService.BASE_URL}/login`, {
                login,
                password
            });
            return response.data;
        } catch(err) {
            throw err;
        }
    }

    static async registerUser(userData, token) {
        try {
            const response = await axios.post(`${PatientService.BASE_URL}/register`, userData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch(err) {
            throw err;
        }
    }

    static async getAllDoctors(token) {
        try {
            const response = await axios.get(`${PatientService.BASE_URL}/doctors`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch(err) {
            throw err;
        }
    }

    static async bookAppointment(appointmentData, token) {
        try {
            const response = await axios.post(`${PatientService.BASE_URL}/appointments`, appointmentData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch(err) {
            throw err;
        }
    }
    
    static async rateDoctor(doctorId, rating, token) {
        try {
            const response = await axios.put(
                `${PatientService.BASE_URL}/doctors/${doctorId}/rate?rating=${rating}`, 
                {}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch(err) {
            throw err;
        }
    }    

    static async getCurrentUserAppointments(token) {
        try {
            const response = await axios.get(`${PatientService.BASE_URL}/appointments/my-appointments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch(err) {
            throw err;
        }
    }    
    
    static async cancelAppointment(appointmentId, token) {
        try {
            const response = await axios.delete(`${PatientService.BASE_URL}/appointments/${appointmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch(err) {
            throw err;
        }
    }

    static async markAppointmentCompleted(appointmentId, token) {
        try {
            const response = await axios.put(
                `${PatientService.BASE_URL}/appointments/${appointmentId}/status?appointmentStatus=COMPLETED`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
        } catch(err) {
            throw err;
        }
    }
}

export default PatientService;