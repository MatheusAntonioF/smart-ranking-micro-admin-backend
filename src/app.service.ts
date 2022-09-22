import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories/category.interface';
import { Player } from './interfaces/players/player.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  async getCategoryById(categoryId: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(categoryId).exec();

      return category;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  async createCategory(createCategoryDTO: Category): Promise<Category> {
    try {
      const createdCategory = new this.categoryModel(createCategoryDTO);

      return createdCategory.save();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
