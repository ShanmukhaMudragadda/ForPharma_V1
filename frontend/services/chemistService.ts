import axiosInstance from '../api/axiosConfig';

export interface ChemistAddress {
    address: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Chemist {
    chemistId: string;
    chemistName: string;
    type: string;
    email: string | null;
    phone: string | null;
    address: string;
    visitingHours: string | null;
    chainName: string | null;
    territoryName: string;
}

export interface ChemistListResponse {
    success: boolean;
    message: string;
    summary: {
        totalTerritories: number;
        totalChemists: number;
    };
    data: Chemist[];
}

// Meeting related interfaces
export interface MeetingCheckIn {
    chemistId: string;
    checkInTime: string;
    location: {
        latitude: number;
        longitude: number;
        address?: string;
    };
}

export interface MeetingSession {
    sessionId: string;
    chemistId: string;
    startTime: string;
    endTime?: string;
    status: 'active' | 'completed' | 'cancelled';
    checkInData?: MeetingCheckIn;
}

class ChemistService {
    // Get all chemists in user's territory
    async getChemistList(): Promise<Chemist[]> {
        try {
            const response = await axiosInstance.get<ChemistListResponse>('/chemists');

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch chemists');
            }
        } catch (error: any) {
            console.error('Error fetching chemist list:', error);
            throw error;
        }
    }

    // Get chemist details by ID
    async getChemistDetails(chemistId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/chemists/getDetails/${chemistId}`);

            if (response.data.success) {
                return response.data.chemist;
            } else {
                throw new Error(response.data.message || 'Failed to fetch chemist details');
            }
        } catch (error: any) {
            console.error('Error fetching chemist details:', error);
            throw error;
        }
    }

    // Create a new chemist
    async createChemist(chemistData: any): Promise<any> {
        try {
            const response = await axiosInstance.post('/chemists/create', chemistData);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to create chemist');
            }
        } catch (error: any) {
            console.error('Error creating chemist:', error);
            throw error;
        }
    }

    // Update chemist
    async updateChemist(chemistId: string, chemistData: any): Promise<any> {
        try {
            const response = await axiosInstance.put(`/chemists/updateChemists/${chemistId}`, chemistData);

            if (response.data.success) {
                return response.data.chemist;
            } else {
                throw new Error(response.data.message || 'Failed to update chemist');
            }
        } catch (error: any) {
            console.error('Error updating chemist:', error);
            throw error;
        }
    }

    // Delete chemist (soft delete)
    async deleteChemist(chemistId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/chemists/deleteChemists/${chemistId}`);

            if (response.data.success) {
                return response.data.chemist;
            } else {
                throw new Error(response.data.message || 'Failed to delete chemist');
            }
        } catch (error: any) {
            console.error('Error deleting chemist:', error);
            throw error;
        }
    }

    // Get chemist's notes
    async getChemistNotes(chemistId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/chemists/${chemistId}/notes`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch chemist notes');
            }
        } catch (error: any) {
            console.error('Error fetching chemist notes:', error);
            throw error;
        }
    }

    // Get chemist's interactions
    async getChemistInteractions(chemistId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/chemists/${chemistId}/interactions`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch chemist interactions');
            }
        } catch (error: any) {
            console.error('Error fetching chemist interactions:', error);
            throw error;
        }
    }

    // Create chemist note
    async createChemistNote(chemistId: string, content: string): Promise<any> {
        try {
            const response = await axiosInstance.post('/chemists/createNotes', { chemistId, content });

            if (response.data.success) {
                return response.data.note;
            } else {
                throw new Error(response.data.message || 'Failed to create note');
            }
        } catch (error: any) {
            console.error('Error creating chemist note:', error);
            throw error;
        }
    }

    // Update chemist note
    async updateChemistNote(noteId: string, content: string): Promise<any> {
        try {
            const response = await axiosInstance.put(`/chemists/updateNotes/${noteId}`, { content });

            if (response.data.success) {
                return response.data.note;
            } else {
                throw new Error(response.data.message || 'Failed to update note');
            }
        } catch (error: any) {
            console.error('Error updating chemist note:', error);
            throw error;
        }
    }

    // Delete chemist note
    async deleteChemistNote(noteId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/chemists/deleteNotes/${noteId}`);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to delete note');
            }
        } catch (error: any) {
            console.error('Error deleting chemist note:', error);
            throw error;
        }
    }

    // Create chemist interaction
    async createChemistInteraction(interactionData: any): Promise<any> {
        try {
            const response = await axiosInstance.post('/chemists/interactions', interactionData);

            if (response.data.success) {
                return response.data.interaction;
            } else {
                throw new Error(response.data.message || 'Failed to create interaction');
            }
        } catch (error: any) {
            console.error('Error creating chemist interaction:', error);
            throw error;
        }
    }

    // Get doctors associated with a chemist
    async getDoctorsForChemist(chemistId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/chemists/${chemistId}/doctors`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch doctors for chemist');
            }
        } catch (error: any) {
            console.error('Error fetching doctors for chemist:', error);
            throw error;
        }
    }

    // Get chemists associated with a doctor
    async getChemistsForDoctor(doctorId: string): Promise<any> {
        try {
            const response = await axiosInstance.get(`/chemists/doctors/${doctorId}/chemists`);

            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to fetch chemists for doctor');
            }
        } catch (error: any) {
            console.error('Error fetching chemists for doctor:', error);
            throw error;
        }
    }

    // Create doctor-chemist relation
    async createDoctorChemistRelation(doctorId: string, chemistId: string): Promise<any> {
        try {
            const response = await axiosInstance.post('/chemists/doctor-relations', { doctorId, chemistId });

            if (response.data.success) {
                return response.data.relation;
            } else {
                throw new Error(response.data.message || 'Failed to create doctor-chemist relation');
            }
        } catch (error: any) {
            console.error('Error creating doctor-chemist relation:', error);
            throw error;
        }
    }

    // Delete doctor-chemist relation
    async deleteDoctorChemistRelation(relationId: string): Promise<any> {
        try {
            const response = await axiosInstance.delete(`/chemists/doctor-relations/${relationId}`);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to delete doctor-chemist relation');
            }
        } catch (error: any) {
            console.error('Error deleting doctor-chemist relation:', error);
            throw error;
        }
    }

    // Meeting Flow Methods

    // Start a meeting session
    async startMeetingSession(chemistId: string): Promise<MeetingSession> {
        try {
            const response = await axiosInstance.post('/chemists/meeting/start', {
                chemistId,
                startTime: new Date().toISOString()
            });

            if (response.data.success) {
                return response.data.session;
            } else {
                throw new Error(response.data.message || 'Failed to start meeting session');
            }
        } catch (error: any) {
            console.error('Error starting meeting session:', error);
            // Return a local session if API doesn't support it
            return {
                sessionId: `session_${Date.now()}`,
                chemistId,
                startTime: new Date().toISOString(),
                status: 'active'
            };
        }
    }

    // End a meeting session
    async endMeetingSession(sessionId: string, endTime: string): Promise<any> {
        try {
            const response = await axiosInstance.post('/chemists/meeting/end', {
                sessionId,
                endTime
            });

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to end meeting session');
            }
        } catch (error: any) {
            console.error('Error ending meeting session:', error);
            // Handle locally if API doesn't support it
            return { success: true };
        }
    }

    // Check-in for a meeting
    async checkInMeeting(checkInData: MeetingCheckIn): Promise<any> {
        try {
            const response = await axiosInstance.post('/chemists/meeting/checkin', checkInData);

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to check-in');
            }
        } catch (error: any) {
            console.error('Error checking in:', error);
            // Handle locally if API doesn't support it
            return { success: true, checkInTime: new Date().toISOString() };
        }
    }

    // Log meeting interaction
    async logMeetingInteraction(chemistId: string, interactionData: any): Promise<any> {
        try {
            const interaction = {
                chemistId,
                type: 'meeting',
                date: new Date().toISOString(),
                ...interactionData
            };
            return await this.createChemistInteraction(interaction);
        } catch (error: any) {
            console.error('Error logging meeting interaction:', error);
            throw error;
        }
    }
}

export default new ChemistService();