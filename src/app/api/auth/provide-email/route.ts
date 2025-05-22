import { NextResponse } from "next/server";
import TempOauth from "@/models/TempOauth";
import User from "@/models/User";
import { auth } from "@/authOptions";
import connectDB from "@/db/db";

export async function POST(request: Request) {
  const { email, token } = await request.json();

  if (!token || !email) {
    return NextResponse.json(
      { message: "Données manquantes" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Email invalide" }, { status: 400 });
  }
  await connectDB();

  console.log("Requête:", { email, token });
  const tempOAuth = await TempOauth.findOne({ token });
  if (!tempOAuth) {
    return NextResponse.json({ message: "Lien expiré" }, { status: 400 });
  }
  console.log("TempOauth:", tempOAuth);

  const user = await User.findOne({ email });
  const session = await auth();

  let redirect;
  if (user) {
    if (session?.user?.email === email) {
      redirect = `/auth/link-account?email=${encodeURIComponent(
        email
      )}&provider=${tempOAuth.provider}&providerAccountId=${
        tempOAuth.providerAccountId
      }`;
    } else {
      redirect = `/login?redirect=/auth/link-account&email=${encodeURIComponent(
        email
      )}&provider=${tempOAuth.provider}&providerAccountId=${
        tempOAuth.providerAccountId
      }`;
    }
  } else {
    redirect = `/auth/link-account?email=${encodeURIComponent(
      email
    )}&provider=${tempOAuth.provider}&providerAccountId=${
      tempOAuth.providerAccountId
    }`;
  }
  await TempOauth.deleteOne({ token });
  return NextResponse.json({ redirect });
}
