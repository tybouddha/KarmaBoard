import User from "@/models/User";

export const getUserFromDb = async (email: string, hashedPassword: string) => {
  return await User.findOne({
    email,
    password: hashedPassword, // attention : ici le mot de passe est déjà hashé
  });
};

export const getUserFromDbByEmail = async (email: string) => {
  return await User.findOne({ email });
};
