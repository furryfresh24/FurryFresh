export interface Voucher {
    id: string;
    title: string;
    description: string;
    discountValue: number;
    discountType: 'percentage' | 'fixed';
    icon?: any;
    forFirstTime: boolean;
    code: string;
    expiryDate?: string;
    isActive: boolean;
    usageLimit?: number;
    usedCount?: number;
    minOrderValue?: number;
    applicableCategories?: string[];
}
