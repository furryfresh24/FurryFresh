interface Pets {
    id: string;
    user_id: string;
    name: string;
    bio?: string;
    gender: string;
    breed: string;
    birthday: Date;
    createdAt: Date;
    updatedAt?: Date;
}

export default Pets;