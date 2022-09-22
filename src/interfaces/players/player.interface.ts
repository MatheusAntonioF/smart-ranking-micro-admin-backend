import { Document } from 'mongoose';
import { Category } from '../categories/category.interface';

export interface Player extends Document {
  readonly phone_number: string;
  readonly email: string;
  category: Category;
  name: string;
  ranking: string;
  position_ranking: number;
  url_photo_player: string;
}
