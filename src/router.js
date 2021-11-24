import { Router } from 'express';
import userRouter from './routes/user.routes.js';
import financialRouter from './routes/financial.routes.js';
import ensureAuth from './middlewares/ensureAuth.js';

const router = Router();

router.get('/test', (req, res) => {
  res.send({
    message: 'Server is ok!',
  })
})

router.use('/', userRouter);
router.use('/financial-events', ensureAuth, financialRouter);

export default router;