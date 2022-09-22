import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly categoriesService: AppService) {}

  @MessagePattern('get-categories')
  async index(@Payload() category_id: string) {
    return this.categoriesService.getCategoryById(category_id);
  }

  @EventPattern('create-category')
  async create(@Payload() category: Category) {
    await this.categoriesService.createCategory(category);
  }
}
