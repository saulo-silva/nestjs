import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: number) {
    const result = await this.taskRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
  }


  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(task =>
  //       task.title.includes(search) ||
  //       task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  //   this.tasks.push(task);
  //   return task;
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);

  //   task.status = status;

  //   return task;
  // }
}
