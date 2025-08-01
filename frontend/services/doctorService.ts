import axiosInstance from '../api/axiosConfig';

export interface Hospital {
    hospitalName: string;
    hospitalAddress: {
        id: string;
        name: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    department: string | null;
    position: string | null;
    isPrimary: boolean;
}

export interface Doctor {
    doctorId: string;
    doctorName: string;
    specialization: string;
    email: string | null;
    phone: string | null;
    hospitals: Hospital[];
}

export interface DoctorListResponse {
    success: boolean;
    message: string;
    data: Doctor[];
}

class DoctorService {
    // Get all doctors in user's territory
    async getDoctorList(): Promise<Doctor[]> {
        try {
            const response = await axiosInstance.get<DoctorListResponse>('/doctors');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch doctors');
            }
        } catch (error: any) {
            console.error('Error fetching doctor list:', error);
            throw error;
        }
    }

    // Get doctor details by ID
    async getDoctorDetails(doctorId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/doctors/getDetails/${doctorId}`);

            if (response.data.success) {
                return response.data.doctor;
            } else {
                throw new Error(response.data.message || 'Failed to fetch doctor details');
            }
        } catch (error: any) {
            console.error('Error fetching doctor details:', error);
            throw error;
        }
    }

    // Create a new doctor
    async createDoctor(doctorData: any): Promise<any> {
        try {
            const response = await axiosInstance.post('/doctors/create', doctorData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to create doctor');
            }
        } catch (error: any) {
            console.error('Error creating doctor:', error);
            throw error;
        }
    }

    // Update doctor
    async updateDoctor(doctorId: string, doctorData: any): Promise<any> {
        try {
            const response = await axiosInstance.put(`/doctors/updateDoctors/${doctorId}`, doctorData);

            if (response.data.success) {
                return response.data.doctor;
            } else {
                throw new Error(response.data.message || 'Failed to update doctor');
            }
        } catch (error: any) {
            console.error('Error updating doctor:', error);
            throw error;
        }
    }

    // Delete doctor (soft delete)
    async deleteDoctor(doctorId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/doctors/deleteDoctors/${doctorId}`);

            if (response.data.success) {
                return response.data.doctor;
            } else {
                throw new Error(response.data.message || 'Failed to delete doctor');
            }
        } catch (error: any) {
            console.error('Error deleting doctor:', error);
            throw error;
        }
    }

    // Get doctor's hospitals
    async getDoctorHospitals(doctorId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/doctors/${doctorId}/hospitals`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch doctor hospitals');
            }
        } catch (error: any) {
            console.error('Error fetching doctor hospitals:', error);
            throw error;
        }
    }

    // Get doctor's schedules
    async getDoctorSchedules(doctorId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/doctors/${doctorId}/schedules`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch doctor schedules');
            }
        } catch (error: any) {
            console.error('Error fetching doctor schedules:', error);
            throw error;
        }
    }

    // Get doctor's notes
    async getDoctorNotes(doctorId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/doctors/${doctorId}/notes`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch doctor notes');
            }
        } catch (error: any) {
            console.error('Error fetching doctor notes:', error);
            throw error;
        }
    }

    // Get doctor's interactions
    async getDoctorInteractions(doctorId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/doctors/${doctorId}/interactions`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch doctor interactions');
            }
        } catch (error: any) {
            console.error('Error fetching doctor interactions:', error);
            throw error;
        }
    }

    // Create doctor note
    async createDoctorNote(doctorId: string, content: string): Promise<any> {
        try {
            const response = await axiosInstance.post('/doctors/createNotes', { doctorId, content });

            if (response.data.success) {
                return response.data.note;
            } else {
                throw new Error(response.data.message || 'Failed to create note');
            }
        } catch (error: any) {
            console.error('Error creating doctor note:', error);
            throw error;
        }
    }

    // Update doctor note
    async updateDoctorNote(noteId: string, content: string): Promise<any> {
        try {
            const response = await axiosInstance.put(`/doctors/updateNotes/${noteId}`, { content });

            if (response.data.success) {
                return response.data.note;
            } else {
                throw new Error(response.data.message || 'Failed to update note');
            }
        } catch (error: any) {
            console.error('Error updating doctor note:', error);
            throw error;
        }
    }

    // Delete doctor note
    async deleteDoctorNote(noteId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/doctors/deleteNotes/${noteId}`);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to delete note');
            }
        } catch (error: any) {
            console.error('Error deleting doctor note:', error);
            throw error;
        }
    }

    // Create doctor interaction
    async createDoctorInteraction(interactionData: any): Promise<any> {
        try {
            const response = await axiosInstance.post('/doctors/createInteractions', interactionData);

            if (response.data.success) {
                return response.data.interaction;
            } else {
                throw new Error(response.data.message || 'Failed to create interaction');
            }
        } catch (error: any) {
            console.error('Error creating doctor interaction:', error);
            throw error;
        }
    }
}

export default new DoctorService();