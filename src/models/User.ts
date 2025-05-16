import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
  },
  role: { type: String, default: "user" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
