// interfaces/review_rating.ts
export default interface ReviewRating {
    id: string;
    user_id: string;
    ref_id: string;
    service_product_id: string;
    type: 'PetCare' | 'PetSupplies';
    rating: number;
    review_text: string;
    created_at: string;
    updated_at?: string;
}
