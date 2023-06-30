import express from 'express';
import controller from '../controllers/Cocktail';

const router = express.Router();

router.post('/create', controller.createCocktail);
router.get('/get/:cocktailId', controller.readCocktail);
router.get('/get/', controller.readAllCocktails);
router.patch('/update/:cocktailId', controller.updateCocktail);
router.delete('/delete/:cocktailId', controller.deleteCocktail);

export = router;
