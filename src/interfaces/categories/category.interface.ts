import { Document } from 'mongoose';

export interface Event {
  name: string;
  operation: string;
  value: number;
}

export interface Category extends Document {
  readonly category: string;

  description: string;

  events: Event[];
}
