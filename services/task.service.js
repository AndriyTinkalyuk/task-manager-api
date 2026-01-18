import Task from '../models/Task.js';

class TaskService {
    async create(task) {
        const createdTask = await Task.create(task);
        return createdTask;
    }

    async getAll() {
            const tasks = await Task.find();
            return tasks;
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID is required');
        }
        const Foundtask = await Task.findById(id);
        return Foundtask;
        
    }

    async update(id, task) {
        if(!id) {
            throw new Error('ID is required');
        }
        const updatedTask = await Task.findByIdAndUpdate(id, task, { new: true } );
        return updatedTask;
    }

    async delete(id) {
        if (!id) { 
            throw new Error('ID is required');
        }

        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
    }
}

export default new TaskService();