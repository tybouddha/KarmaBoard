import mongoose, { Schema, models } from "mongoose";

const tempOauthSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
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
    expires: 3600,
  },
});

const TempOauth =
  models.TempOauth || mongoose.model("TempOauth", tempOauthSchema, "tempOauth");

export default TempOauth;
