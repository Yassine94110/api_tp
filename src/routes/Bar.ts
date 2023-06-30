import express from 'express';
import controller from '../controllers/Bar';

const router = express.Router();

router.post('/create', controller.createBar);
router.get('/get/:barId', controller.readBar);
router.get('/get/', controller.readAllBars);
router.patch('/update/:barId', controller.updateBar);
router.delete('/delete/:barId', controller.deleteBar);
router.get('/cocktails/:cocktailId', controller.findBarsByCocktail);

export = router;
