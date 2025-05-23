interface SupplySubcategory {
    id: string;
    name: string;
    description?: string;
    is_active: boolean;
    created_at: Date;
    updated_at?: Date;
}

export default SupplySubcategory;