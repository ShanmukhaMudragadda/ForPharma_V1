// types/drug.ts
export interface DrugItem {
    id: string;
    name: string;
    composition?: string;
    manufacturer?: string;
    indications?: string;
    sideEffects?: string;
    safetyAdvice?: string;
    // dosageForms?: string[] | string;
    dosageForms?: string; // For compatibility with DrugCard
    price?: number | string;
    schedule?: string;
    regulatoryApprovals?: string;
    category?: string;
    isAvailable?: boolean;
    images?: string[];
    image?: string; // For compatibility with DrugCard
    marketingMaterials?: any;
    createdAt?: string;
    updatedAt?: string;
    isActive?: boolean;
}

export interface DrugResponse {
    id: string;
    organizationId: string;
    name: string;
    composition?: string;
    manufacturer?: string;
    indications?: string;
    sideEffects?: string;
    safetyAdvice?: string;
    dosageForms?: string;
    price?: number;
    schedule?: string;
    regulatoryApprovals?: string;
    category?: string;
    isAvailable: boolean;
    images?: string[];
    marketingMaterials?: any;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
}

// Note: DrugNote functionality removed as per database schema

export interface DrugListResponse {
    success: boolean;
    message: string;
    summary: {
        totalDrugs: number;
        availableCount: number;
        outOfStockCount: number;
    };
    data: DrugItem[];
}

export interface FilterOption {
    id: string;
    label: string;
    count?: number;
    checked: boolean;
}

export interface FilterSection {
    id: string;
    title: string;
    options: FilterOption[];
}

export interface ActiveFilter {
    sectionId: string;
    optionId: string;
    label: string;
}

export interface DrugComparisonItem {
    drug: DrugItem | null;
    isSelected: boolean;
}