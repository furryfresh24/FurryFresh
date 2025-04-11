interface Pets {
    id: string;
    user_id: string;
    name: string;
    pet_avatar?: string;
    bio?: string;
    pet_type: string;
    gender: string;
    breed: string;
    birthday: Date;
    createdAt: Date;
    updatedAt?: Date;
}

export default Pets;