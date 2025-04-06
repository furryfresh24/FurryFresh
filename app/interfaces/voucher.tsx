interface Voucher {
    id: string;
    title: string;
    description: string;
    discountValue: number;
    discountType: 'percentage' | 'fixed';
    icon?: any;
    forFirstTime: boolean;
    code: string; // e.g. "SAVE10"
    expiryDate?: string; // ISO format "2025-05-01T00:00:00Z"
    isActive: boolean; // can the user still use it?
    usageLimit?: number; // optional - max total uses
    usedCount?: number;  // optional - how many times it's been used
    minOrderValue?: number; // optional - e.g., only valid for orders > $50
    applicableCategories?: string[]; // e.g., ["Grooming", "Supplies"]
}

export default Voucher;