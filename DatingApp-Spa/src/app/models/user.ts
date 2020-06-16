import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    knowAs: string;
    age: number;
    gender: string;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookinFor?: string;
    photos?: Photo[];
}
