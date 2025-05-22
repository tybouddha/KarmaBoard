import mongoose, { Schema, models } from "mongoose";

interface IUser extends Document {
  email: string;
  password?: string;
  name?: string;
  role: string;
  provider?: string;
  providerAccountId?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
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
  provider: { type: String, required: false },
  providerAccountId: { type: String, required: false },

  role: { type: String, default: "user" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
