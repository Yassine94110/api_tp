import mongoose, { Document, Schema } from 'mongoose';

export interface ICocktail {
    nom: string;
    price: number;
    alcool: boolean;
    ingredients: string[];
    description: string;
}

export interface ICocktailModel extends ICocktail, Document {}

const CocktailSchema: Schema = new Schema(
    {
        nom: { type: String, required: true },
        price: { type: Number, required: true },
        alcool: { type: Boolean, required: true },
        ingredients: { type: [String], required: true },
        description: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ICocktailModel>('Cocktail', CocktailSchema);
