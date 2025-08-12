// constants/drugConstants.ts

export const DRUG_CATEGORIES = [
    'Analgesic',
    'Antibiotic',
    'Antidiabetic',
    'Antihypertensive',
    'Antipyretic',
    'Antiplatelet',
    'Proton Pump Inhibitor',
    'Statin',
    'Antihistamine',
    'Antacid',
    'Bronchodilator',
    'Diuretic'
];

export const DRUG_SCHEDULES = [
    'Schedule H',
    'Schedule H1',
    'Schedule X',
    'OTC', // Over the Counter
    'Schedule G'
];

export const DOSAGE_FORMS = [
    'Tablets',
    'Capsules',
    'Syrup',
    'Injection',
    'Ointment',
    'Cream',
    'Drops',
    'Inhaler',
    'Suspension'
];

export const MANUFACTURERS = [
    'Sun Pharmaceutical Industries',
    'Cipla Limited',
    'Dr. Reddy\'s Laboratories',
    'Ranbaxy Laboratories',
    'GlaxoSmithKline',
    'Lupin Pharmaceuticals',
    'Bayer Pharmaceuticals',
    'Pfizer',
    'Novartis',
    'Abbott Healthcare'
];

export const REGULATORY_APPROVALS = [
    'FDA Approved',
    'CDSCO Approved',
    'EMA Approved',
    'WHO Prequalified',
    'USFDA Approved'
];

export const SECTION_NAVIGATION = [
    { id: 'product', label: 'Product', icon: 'medical-outline' },
    { id: 'uses', label: 'Uses', icon: 'heart-outline' },
    { id: 'side-effects', label: 'Side Effects', icon: 'warning-outline' },
    { id: 'safety', label: 'Safety', icon: 'shield-outline' },
    { id: 'promotional', label: 'Promotional', icon: 'document-outline' }
];

export const COMPARISON_FIELDS = [
    { key: 'name', label: 'Drug Name', type: 'text', priority: 1 },
    { key: 'manufacturer', label: 'Manufacturer', type: 'text', priority: 2 },
    { key: 'composition', label: 'Composition', type: 'text', priority: 3 },
    { key: 'category', label: 'Category', type: 'text', priority: 4 },
    { key: 'price', label: 'Price', type: 'price', priority: 5 },
    { key: 'dosageForms', label: 'Dosage Forms', type: 'array', priority: 6 },
    { key: 'schedule', label: 'Schedule', type: 'text', priority: 7 },
    { key: 'regulatoryApprovals', label: 'Regulatory Status', type: 'text', priority: 8 },
    { key: 'isAvailable', label: 'Availability', type: 'boolean', priority: 9 },
    { key: 'indications', label: 'Uses & Indications', type: 'longtext', priority: 10 },
    { key: 'sideEffects', label: 'Side Effects', type: 'longtext', priority: 11 },
    { key: 'safetyAdvice', label: 'Safety Advice', type: 'longtext', priority: 12 }
];

export const PROMOTIONAL_MATERIAL_TYPES = [
    { id: 'brochure', label: 'Product Brochure', icon: 'document-text-outline' },
    { id: 'clinical-studies', label: 'Clinical Studies', icon: 'bar-chart-outline' },
    { id: 'patient-education', label: 'Patient Education', icon: 'school-outline' },
    { id: 'video-presentation', label: 'Video Presentation', icon: 'play-outline' },
    { id: 'comparison-chart', label: 'Comparison Chart', icon: 'analytics-outline' },
    { id: 'safety-data', label: 'Safety Data Sheet', icon: 'shield-outline' }
];