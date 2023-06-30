import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Cocktail from '../models/Cocktail';

const createCocktail = (req: Request, res: Response, next: NextFunction) => {
    const { nom, price, alcool, ingredients, description } = req.body;

    const cocktail = new Cocktail({
        _id: new mongoose.Types.ObjectId(),
        nom,
        price,
        alcool,
        ingredients,
        description
    });

    return cocktail
        .save()
        .then((cocktail) => res.status(201).json({ cocktail }))
        .catch((error) => res.status(500).json({ error }));
};

const readCocktail = (req: Request, res: Response, next: NextFunction) => {
    const cocktailId = req.params.cocktailId;

    return Cocktail.findById(cocktailId)
        .then((cocktail) => (cocktail ? res.status(200).json({ cocktail }) : res.status(404).json({ message: '404' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllCocktails = (req: Request, res: Response, next: NextFunction) => {
    return Cocktail.find()
        .then((cocktails) => res.status(200).json({ cocktails }))
        .catch((error) => res.status(500).json({ error }));
};

const updateCocktail = (req: Request, res: Response, next: NextFunction) => {
    const cocktailId = req.params.cocktailId;

    return Cocktail.findById(cocktailId)
        .then((cocktail) => {
            if (cocktail) {
                cocktail.set(req.body);

                return cocktail
                    .save()
                    .then((cocktail) => res.status(200).json({ cocktail }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: '404' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCocktail = (req: Request, res: Response, next: NextFunction) => {
    const cocktailId = req.params.cocktailId;

    return Cocktail.findByIdAndDelete(cocktailId)
        .then((cocktail) => (cocktail ? res.status(200).json({ cocktail, message: 'Deleted' }) : res.status(404).json({ message: '404' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createCocktail, readCocktail, readAllCocktails, updateCocktail, deleteCocktail };
