import { Router } from 'express';
import FinancialController from '../controllers/FinancialController.js';

const financialRouter = Router();

financialRouter.post('/', FinancialController.createFinancialEvent);
financialRouter.get('/', FinancialController.getEvents);
financialRouter.get('/sum', FinancialController.getTotalSum);

export default financialRouter;