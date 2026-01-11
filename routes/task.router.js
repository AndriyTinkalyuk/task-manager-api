import { Router } from 'express';
import taskController from '../controllers/task.controller.js';

const router = Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router;