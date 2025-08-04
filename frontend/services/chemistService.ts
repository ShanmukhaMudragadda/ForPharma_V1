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
    email: string;
    phone: string;
    address: string;
    visitingHours: string | null;
    chainName: string | null;
    territoryName: string;
}

export interface ChemistDetails {
    id: string;
    organizationId: string;
    name: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number | null;
    longitude: number | null;
    description: string | null;
    profilePictureUrl: string | null;
    visitingHours: string | null;
    chemistChain: {
        id: string;
        name: string;
    } | null;
    territory: {
        id: string;
        name: string;
    };
}

export interface ChemistNote {
    id: string;
    chemistId: string;
    createdById: string;
    content: string;
    createdAt: string;
    createdBy: {
        id: string;
        email: string;
        role: string;
    };
}

export interface ChemistInteraction {
    id: string;
    chemistId: string;
    employeeId: string;
    interactionType: string;
    startTime: string;
    endTime: string | null;
    purpose: string | null;
    outcome: string | null;
    comments: string | null;
    rating: number | null;
    employee: {
        id: string;
        email: string;
        role: string;
    };
}

export interface RelatedDoctor {
    id: string;
    doctorId: string;
    chemistId: string;
    createdAt: string;
    doctor: {
        id: string;
        name: string;
        specialization: string;
        email: string;
        phone: string;
        qualification: string;
    };
}

class ChemistService {
    // Get list of chemists for the logged-in user
    async getChemistList(): Promise<Chemist[]> {
        try {
            const response = await axiosInstance.get('/chemists');
            console.log('Chemist list response:', response.data);
            return response.data.data || [];
        } catch (error) {
            console.error('Error fetching chemist list:', error);
            throw error;
        }
    }

    // Get chemist details
    async getChemistDetails(chemistId: string): Promise<ChemistDetails> {
        try {
            const response = await axiosInstance.get(`/chemists/getDetails/${chemistId}`);
            console.log('Chemist details response:', response.data);
            return response.data.chemist;
        } catch (error) {
            console.error('Error fetching chemist details:', error);
            throw error;
        }
    }

    // Get chemist notes
    async getChemistNotes(chemistId: string): Promise<{ notes: ChemistNote[] }> {
        try {
            const response = await axiosInstance.get(`/chemists/${chemistId}/notes`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching chemist notes:', error);
            throw error;
        }
    }

    // Create chemist note
    async createChemistNote(chemistId: string, content: string): Promise<ChemistNote> {
        try {
            const response = await axiosInstance.post('/chemists/createNotes', {
                chemistId,
                content
            });
            return response.data.note;
        } catch (error) {
            console.error('Error creating chemist note:', error);
            throw error;
        }
    }

    // Update chemist note
    async updateChemistNote(noteId: string, content: string): Promise<ChemistNote> {
        try {
            const response = await axiosInstance.put(`/chemists/updateNotes/${noteId}`, {
                content
            });
            return response.data.note;
        } catch (error) {
            console.error('Error updating chemist note:', error);
            throw error;
        }
    }

    // Delete chemist note
    async deleteChemistNote(noteId: string): Promise<void> {
        try {
            await axiosInstance.delete(`/chemists/deleteNotes/${noteId}`);
        } catch (error) {
            console.error('Error deleting chemist note:', error);
            throw error;
        }
    }

    // Get chemist interactions
    async getChemistInteractions(chemistId: string): Promise<{ interactions: ChemistInteraction[] }> {
        try {
            const response = await axiosInstance.get(`/chemists/${chemistId}/interactions`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching chemist interactions:', error);
            throw error;
        }
    }

    // Get doctors related to chemist
    async getDoctorsForChemist(chemistId: string): Promise<{ doctors: RelatedDoctor[] }> {
        try {
            const response = await axiosInstance.get(`/chemists/${chemistId}/doctors`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching related doctors:', error);
            throw error;
        }
    }
}

const chemistService = new ChemistService();
export default chemistService;