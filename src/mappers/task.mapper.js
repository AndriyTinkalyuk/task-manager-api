import { responseTaskDto, createTaskDto, updateTaskDto } from '../dto/task.dto.js';

class TaskMapper {
 
    static toCreate(dto) {
        return createTaskDto(dto);
    }

    static toResponse(model) {
        if (!model) return null;
        
        return responseTaskDto(model);
    }

    static toUpdate(dto) {
        return updateTaskDto(dto);
    }

    static toResponseList(models) {
        if (!models || !Array.isArray(models)) {
            return [];
        }
        
        return models.map(model => TaskMapper.toResponse(model));
    }
}

export default TaskMapper;