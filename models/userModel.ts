import { Ievent } from "@/lib/types/eventTypes";
import mongoose from "mongoose";

export interface Iuser {
  _id: string;
  email: string;
  password: string;
  username: string;
  role: string;
  image: string;
  resetToken?: string;
  resetTokenExpiresAt?: Date;
  bookmarks: Ievent[];
}

const userSchema = new mongoose.Schema<Iuser>(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    image: { type: String },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "EventsModel" }],
    resetToken: { type: String },
    resetTokenExpiresAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false, // Disables __v
  }
);

const User =
  mongoose?.models?.UsersModel ||
  mongoose?.model<Iuser>("UsersModel", userSchema);
export default User;
