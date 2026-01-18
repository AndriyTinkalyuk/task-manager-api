import Task from '../models/Task.js';
import TaskMapper from '../mappers/task.mapper.js';

class TaskService {
    async create(task) {
        const createdTask = await Task.create(TaskMapper.toCreate(task));
        return TaskMapper.toResponse(createdTask);
    }

    async getAll() {
            const tasks = await Task.find();
            return TaskMapper.toResponseList(tasks);
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID is required');
        }
        const Foundtask = await Task.findById(id);
        return TaskMapper.toResponse(Foundtask);
        
    }

    async update(id, task) {
        if(!id) {
            throw new Error('ID is required');
        }
        const updatedTask = await Task.findByIdAndUpdate(id, TaskMapper.toUpdate(task), { new: true } );
        return TaskMapper.toResponse(updatedTask);
    }

    async delete(id) {
        if (!id) { 
            throw new Error('ID is required');
        }

        const deletedTask = await Task.findByIdAndDelete(id);
        return TaskMapper.toResponse(deletedTask);
    }
}

export default new TaskService();