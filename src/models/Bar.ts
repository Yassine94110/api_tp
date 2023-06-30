import mongoose, { Document, Schema } from 'mongoose';

export interface IBar {
    location: {
        lat: number;
        lon: number;
    };
    adresse: string;
    cocktails: string[];
}

export interface IBarModel extends IBar, Document {}

const BarSchema: Schema = new Schema(
    {
        location: {
            lat: { type: Number, required: true },
            lon: { type: Number, required: true }
        },
        adresse: { type: String, required: true },
        cocktails: { type: [String], required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IBarModel>('Bar', BarSchema);
