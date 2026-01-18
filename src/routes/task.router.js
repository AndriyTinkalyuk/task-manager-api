import { Router } from 'express';
import taskController from '../controllers/task.controller.js';
import { validateCreateTask, validateUpdateTask, validateTaskId } from '../middleware/task.validation.js';

const router = Router();

router.post('/', validateCreateTask, taskController.createTask);
router.get('/', taskController.getAll);
router.get('/:id', validateTaskId, taskController.getOne);
router.put('/:id', validateTaskId, validateUpdateTask, taskController.update);
router.delete('/:id', validateTaskId, taskController.delete);

export default router;