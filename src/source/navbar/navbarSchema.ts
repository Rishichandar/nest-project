import { Schema, Document } from 'mongoose';

export interface Navbar extends Document {
    navbarItems: Array<{ path: string; label: string }>;
    companyDropdownItems: Array<{ path: string; label: string }>;
    deletedAt?: Date;
}

export const NavbarSchema = new Schema({
    navbarItems: [{
        path: { type: String, required: true },
        label: { type: String, required: true },
    }],
    companyDropdownItems: [{
        path: { type: String, required: true },
        label: { type: String, required: true },
    }],
    deletedAt: { type: Date },
}, { timestamps: true });
