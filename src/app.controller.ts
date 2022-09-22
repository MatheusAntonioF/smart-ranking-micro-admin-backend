import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);

  constructor(private readonly categoriesService: AppService) {}

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category) {
    this.categoriesService.createCategory(category);
  }
}
