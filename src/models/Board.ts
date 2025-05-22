import mongoose, { Schema, models } from "mongoose";

const boardSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Board = models.Board || mongoose.model("Board", boardSchema);

export default Board;
