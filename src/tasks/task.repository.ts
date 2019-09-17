import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./create-task.dto";
import { GetTasksFilterDto } from "./get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    
    if (status) {
      console.log(status);
      query.andWhere('task.status = :status', { status })
    }
    
    if (search) {
      query.orWhere('(task.title LIKE :search OR task.description like :search)', { search: `%${search}%` })
    }

    const tasks = query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
}