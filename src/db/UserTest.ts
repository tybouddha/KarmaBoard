import mongoose from "mongoose";
import { saltAndHashPassword } from "@/utils/password";
import User from "@/models/User";

async function createUser() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const hashedPassword = await saltAndHashPassword("test123");
  const user = new User({
    email: "test@test.com",
    password: hashedPassword,
    name: "Test User",
    role: "user",
  });
  await user.save();
  console.log("Utilisateur créé");
}

createUser();
