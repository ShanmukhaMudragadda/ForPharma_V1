// import axiosInstance from '../api/axiosConfig';

// export interface ChemistAddress {
//     address: string;
//     city: string;
//     state: string;
//     pincode: string;
// }

// export interface Chemist {
//     chemistId: string;
//     chemistName: string;
//     type: string;
//     email: string;
//     phone: string;
//     address: string;
//     visitingHours: string | null;
//     chainName: string | null;
//     territoryName: string;
// }

// export interface ChemistDetails {
//     id: string;
//     organizationId: string;
//     name: string;
//     type: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     state: string;
//     pincode: string;
//     latitude: number | null;
//     longitude: number | null;
//     description: string | null;
//     profilePictureUrl: string | null;
//     visitingHours: string | null;
//     chemistChain: {
//         id: string;
//         name: string;
//     } | null;
//     territory: {
//         id: string;
//         name: string;
//     };
// }

// export interface ChemistNote {
//     id: string;
//     chemistId: string;
//     createdById: string;
//     content: string;
//     createdAt: string;
//     createdBy: {
//         id: string;
//         email: string;
//         role: string;
//     };
// }

// export interface ChemistInteraction {
//     id: string;
//     chemistId: string;
//     employeeId: string;
//     interactionType: string;
//     startTime: string;
//     endTime: string | null;
//     purpose: string | null;
//     outcome: string | null;
//     comments: string | null;
//     rating: number | null;
//     employee: {
//         id: string;
//         email: string;
//         role: string;
//     };
// }

// export interface RelatedDoctor {
//     id: string;
//     doctorId: string;
//     chemistId: string;
//     createdAt: string;
//     doctor: {
//         id: string;
//         name: string;
//         specialization: string;
//         email: string;
//         phone: string;
//         qualification: string;
//     };
// }

// class ChemistService {
//     // Get list of chemists for the logged-in user
//     async getChemistList(): Promise<Chemist[]> {
//         try {
//             const response = await axiosInstance.get('/chemists');
//             console.log('Chemist list response:', response.data);
//             return response.data.data || [];
//         } catch (error) {
//             console.error('Error fetching chemist list:', error);
//             throw error;
//         }
//     }

//     // Get chemist details
//     async getChemistDetails(chemistId: string): Promise<ChemistDetails> {
//         try {
//             const response = await axiosInstance.get(`/chemists/getDetails/${chemistId}`);
//             console.log('Chemist details response:', response.data);
//             return response.data.chemist;
//         } catch (error) {
//             console.error('Error fetching chemist details:', error);
//             throw error;
//         }
//     }

//     // Get chemist notes
//     async getChemistNotes(chemistId: string): Promise<{ notes: ChemistNote[] }> {
//         try {
//             const response = await axiosInstance.get(`/chemists/${chemistId}/notes`);
//             return response.data.data;
//         } catch (error) {
//             console.error('Error fetching chemist notes:', error);
//             throw error;
//         }
//     }

//     // Create chemist note
//     async createChemistNote(chemistId: string, content: string): Promise<ChemistNote> {
//         try {
//             const response = await axiosInstance.post('/chemists/createNotes', {
//                 chemistId,
//                 content
//             });
//             return response.data.note;
//         } catch (error) {
//             console.error('Error creating chemist note:', error);
//             throw error;
//         }
//     }

//     // Update chemist note
//     async updateChemistNote(noteId: string, content: string): Promise<ChemistNote> {
//         try {
//             const response = await axiosInstance.put(`/chemists/updateNotes/${noteId}`, {
//                 content
//             });
//             return response.data.note;
//         } catch (error) {
//             console.error('Error updating chemist note:', error);
//             throw error;
//         }
//     }

//     // Delete chemist note
//     async deleteChemistNote(noteId: string): Promise<void> {
//         try {
//             await axiosInstance.delete(`/chemists/deleteNotes/${noteId}`);
//         } catch (error) {
//             console.error('Error deleting chemist note:', error);
//             throw error;
//         }
//     }

//     // Get chemist interactions
//     async getChemistInteractions(chemistId: string): Promise<{ interactions: ChemistInteraction[] }> {
//         try {
//             const response = await axiosInstance.get(`/chemists/${chemistId}/interactions`);
//             return response.data.data;
//         } catch (error) {
//             console.error('Error fetching chemist interactions:', error);
//             throw error;
//         }
//     }

//     // Get doctors related to chemist
//     async getDoctorsForChemist(chemistId: string): Promise<{ doctors: RelatedDoctor[] }> {
//         try {
//             const response = await axiosInstance.get(`/chemists/${chemistId}/doctors`);
//             return response.data.data;
//         } catch (error) {
//             console.error('Error fetching related doctors:', error);
//             throw error;
//         }
//     }
// }

// const chemistService = new ChemistService();
// export default chemistService;

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
}

export default new ChemistService();