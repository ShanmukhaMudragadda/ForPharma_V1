// utils/drugUtils.ts
import { DrugItem } from '../types/drug';

// Transform drug data for DrugCard component
export const transformDrugForCard = (drug: DrugItem) => ({
    ...drug,
    price: drug.price ? `₹${Number(drug.price).toFixed(2)}` : 'N/A',
    image: drug.images && Array.isArray(drug.images) && drug.images.length > 0
        ? drug.images[0]
        : undefined
});

// Format dosage forms for display
export const formatDosageForms = (dosageForms: string[] | string | undefined): string => {
    if (!dosageForms) return 'N/A';
    if (Array.isArray(dosageForms)) {
        return dosageForms.join(', ');
    }
    return dosageForms;
};

// Format price for display
export const formatPrice = (price: number | string | undefined): string => {
    if (!price) return 'N/A';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${numPrice.toFixed(2)}`;
};

// Get availability status with color
export const getAvailabilityStatus = (isAvailable: boolean | undefined) => {
    if (isAvailable === undefined) {
        return {
            text: 'Unknown',
            bgColor: 'bg-gray-100',
            textColor: 'text-gray-600'
        };
    }

    return {
        text: isAvailable ? 'In Stock' : 'Out of Stock',
        bgColor: isAvailable ? 'bg-green-100' : 'bg-red-100',
        textColor: isAvailable ? 'text-green-800' : 'text-red-800'
    };
};

// Get category color for badges
export const getCategoryColor = (category: string | undefined) => {
    if (!category) return { bgColor: 'bg-gray-100', textColor: 'text-gray-600' };

    const categoryColors: Record<string, { bgColor: string; textColor: string }> = {
        'Analgesic': { bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
        'Antibiotic': { bgColor: 'bg-green-100', textColor: 'text-green-800' },
        'Antidiabetic': { bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
        'Antihypertensive': { bgColor: 'bg-red-100', textColor: 'text-red-800' },
        'Antipyretic': { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
        'Antiplatelet': { bgColor: 'bg-pink-100', textColor: 'text-pink-800' },
        'Proton Pump Inhibitor': { bgColor: 'bg-indigo-100', textColor: 'text-indigo-800' },
        'Statin': { bgColor: 'bg-orange-100', textColor: 'text-orange-800' }
    };

    return categoryColors[category] || { bgColor: 'bg-gray-100', textColor: 'text-gray-600' };
};

// Generate unique filters from drug data
export const generateFilterOptions = (drugs: DrugItem[]) => {
    const categories = [...new Set(drugs.map(drug => drug.category).filter(Boolean))];
    const manufacturers = [...new Set(drugs.map(drug => drug.manufacturer).filter(Boolean))];

    return {
        categories,
        manufacturers,
    };
};

// Validate drug data
export const validateDrugData = (drugData: Partial<DrugItem>) => {
    const errors: string[] = [];

    if (!drugData.name?.trim()) {
        errors.push('Drug name is required');
    }

    if (!drugData.manufacturer?.trim()) {
        errors.push('Manufacturer is required');
    }

    if (!drugData.category?.trim()) {
        errors.push('Category is required');
    }

    if (drugData.price && (isNaN(Number(drugData.price)) || Number(drugData.price) < 0)) {
        errors.push('Price must be a valid positive number');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Search drugs by multiple criteria
export const searchDrugs = (drugs: DrugItem[], query: string): DrugItem[] => {
    if (!query.trim()) return drugs;

    const searchTerm = query.toLowerCase().trim();

    return drugs.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm) ||
        drug.composition?.toLowerCase().includes(searchTerm) ||
        drug.manufacturer?.toLowerCase().includes(searchTerm) ||
        drug.category?.toLowerCase().includes(searchTerm)
    );
};

// Apply filters to drugs
export const applyFilters = (drugs: DrugItem[], filters: any[]): DrugItem[] => {
    if (filters.length === 0) return drugs;

    return drugs.filter(drug => {
        return filters.every(filter => {
            switch (filter.sectionId) {
                case 'category':
                    return drug.category === filter.label;
                case 'manufacturer':
                    return drug.manufacturer === filter.label;
                case 'availability':
                    if (filter.label === 'In Stock') {
                        return drug.isAvailable === true;
                    } else if (filter.label === 'Out of Stock') {
                        return drug.isAvailable === false;
                    }
                    return true;
                default:
                    return true;
            }
        });
    });
};