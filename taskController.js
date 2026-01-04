import PostService from './PostService.js';
 
 class TaskController {
    async createTask(req, res) {
        try {
            const task = await PostService.create(req.body);
            return res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const tasks = await PostService.getAll();
            return res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOne(req, res) {
        try {
          const task = await PostService.getOne(req.params.id);
          return res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
        const updatedTask = await PostService.update(req.body);
        return res.status(200).json(updatedTask);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    }
    }

    async delete(req, res) {
        try {
            const deletedTask = await PostService.delete(req.params.id);
            return res.status(200).json(deletedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
 }

 export default new TaskController();