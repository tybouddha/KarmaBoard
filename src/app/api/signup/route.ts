import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/db/db";
import { saltAndHashPassword } from "@/utils/password";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { message: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await saltAndHashPassword(password);
    const user = new User({
      email,
      password: hashedPassword,
      name: name || undefined,
      role: "user",
    });

    await user.save();

    return NextResponse.json(
      { message: "Utilisateur créé avec succès" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
