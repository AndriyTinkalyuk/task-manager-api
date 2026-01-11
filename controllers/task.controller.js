import TaskService from '../services/task.service.js';
import ApiError from '../error/apiError.js';
 
 class TaskController {
    async createTask(req, res, next) {
        try {
            const task = await TaskService.create(req.body);
            return res.status(201).json(task);
        } catch (error) {
            next(ApiError.BadRequest('Error creating task'));
        }
    }

    async getAll(req, res, next) {
        try {
            const tasks = await TaskService.getAll();
            return res.status(200).json(tasks);
        } catch (error) {
            next(ApiError.NotFound('Error getting tasks'));
        }
    }

    async getOne(req, res, next) {
        try {
          const task = await TaskService.getOne(req.params.id);
          if (!task) {
            return next(ApiError.NotFound('id is required'));
          }
          return res.status(200).json(task);
        } catch (error) {
            next(ApiError.NotFound('Error getting task'));
        }
    }

    async update(req, res, next) {
        try {
        const updatedTask = await TaskService.update(req.body);
        return res.status(200).json(updatedTask);
    } catch (error) { 
        next(ApiError.BadRequest('Error updating task'));
    }
    }

    async delete(req, res, next) {
        try {
            const deletedTask = await TaskService.delete(req.params.id);
            if (!deletedTask) {
                return next(ApiError.NotFound('id is required'));
            }
            return res.status(200).json(deletedTask);
        } catch (error) {
            next(ApiError.NotFound('Error deleting task'));
        }
    }
 }

 export default new TaskController();