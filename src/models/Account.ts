import mongoose, { Schema, models } from "mongoose";

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  provider: {
    type: String,
    required: true,
    enum: ["google", "github"],
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index pour éviter les doublons
accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

const Account = models.Account || mongoose.model("Account", accountSchema);

export default Account;
