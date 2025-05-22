import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/db/db";

export async function POST(request: Request) {
  const { email, provider, providerAccountId } = await request.json();

  if (!email || !provider || !providerAccountId) {
    return NextResponse.json(
      { message: "Données manquantes" },
      { status: 400 }
    );
  }

  await connectDB();

  const user = await User.findOne({ email });

  if (user) {
    // Lier le compte OAuth
    await User.updateOne({ email }, { $set: { provider, providerAccountId } });
    return NextResponse.json({ redirect: "/dashboard", action: "linked" });
  } else {
    // Créer un nouvel utilisateur
    await User.create({
      email,
      provider,
      providerAccountId,
      role: "user",
      name: email.split("@")[0],
    });
    return NextResponse.json({ redirect: "/dashboard", action: "created" });
  }
}
