import { Schema } from 'mongoose';

export const CategorySchema = new Schema(
  {
    category: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    events: [
      {
        name: { type: String },
        operation: { type: String },
        value: { type: Number },
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);
