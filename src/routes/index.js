import { Router } from 'express';
import taskRouter from './task.router.js';

const router = Router();

router.use('/tasks', taskRouter);

export default router;