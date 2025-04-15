interface Pets {
    id: string;
    user_id: string;
    name: string;
    pet_avatar?: string;
    bio?: string;
    pet_type: string;
    gender: string;
    weight?: number;
    breed: string;
    birthday: Date;
    size?: string;
    createdAt: Date;
    updatedAt?: Date;
} 

export default Pets;