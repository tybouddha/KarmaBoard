import mongoose, { Schema, models } from "mongoose";

// src/models/List.ts
const listSchema = new Schema({
  title: { type: String, required: true },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  order: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const List = models.List || mongoose.model("List", listSchema);

export default List;
