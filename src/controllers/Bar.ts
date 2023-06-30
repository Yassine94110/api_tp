import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Bar from '../models/Bar';

const createBar = (req: Request, res: Response, next: NextFunction) => {
    const { location, adresse, cocktails } = req.body;

    const bar = new Bar({
        _id: new mongoose.Types.ObjectId(),
        location,
        adresse,
        cocktails
    });

    return bar
        .save()
        .then((bar) => res.status(201).json({ bar }))
        .catch((error) => res.status(500).json({ error }));
};

const readBar = (req: Request, res: Response, next: NextFunction) => {
    const barId = req.params.barId;

    return Bar.findById(barId)
        .then((bar) => (bar ? res.status(200).json({ bar }) : res.status(404).json({ message: '404' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllBars = (req: Request, res: Response, next: NextFunction) => {
    return Bar.find()
        .then((bars) => res.status(200).json({ bars }))
        .catch((error) => res.status(500).json({ error }));
};

const updateBar = (req: Request, res: Response, next: NextFunction) => {
    const barId = req.params.barId;

    return Bar.findById(barId)
        .then((bar) => {
            if (bar) {
                bar.set(req.body);

                return bar
                    .save()
                    .then((bar) => res.status(200).json({ bar }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: '404' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteBar = (req: Request, res: Response, next: NextFunction) => {
    const barId = req.params.barId;

    return Bar.findByIdAndDelete(barId)
        .then((bar) => (bar ? res.status(200).json({ bar, message: '404' }) : res.status(404).json({ message: '404' })))
        .catch((error) => res.status(500).json({ error }));
};
const findBarsByCocktail = (req: Request, res: Response, next: NextFunction) => {
    const cocktailId = req.params.cocktailId;

    Bar.find({ cocktails: { $in: [cocktailId] } })
        .then((bars) => res.status(200).json({ bars }))
        .catch((error) => res.status(500).json({ error }));
};

export default { createBar, readBar, readAllBars, updateBar, deleteBar, findBarsByCocktail };
