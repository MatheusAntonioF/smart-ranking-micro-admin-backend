import mongoose, { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
  {
    phone_number: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    name: String,
    ranking: String,
    position_ranking: Number,
    url_photo_player: String,
  },
  {
    timestamps: true, // add timestamp fields createdAt and updatedAt
    collection: 'players', // collection name / table name
  },
);
