import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async create(todo: { title: string }): Promise<Todo> {
    const newTodo = this.todoRepository.create(todo);
    return await this.todoRepository.save(newTodo);
  }

  async delete(id): Promise<void> {
    const todoToRemove = await this.todoRepository.delete(id);
    if (!todoToRemove) {
      console.log("tututu...")
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    // await this.todoRepository.remove(todoToRemove);
  }
}
