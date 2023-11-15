import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() todo: { title: string }): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.todoService.delete(id);
  }
}