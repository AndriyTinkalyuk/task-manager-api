import { Router } from 'express';
import taskController from './taskController.js';

const router = Router();

router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getAll);
router.get('/tasks/:id', taskController.getOne);
router.put('/tasks', taskController.update);
router.delete('/tasks/:id', taskController.delete);

export default router;