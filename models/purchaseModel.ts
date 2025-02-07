import mongoose from "mongoose";
import { Iuser } from "./userModel";
import { Ievent } from "@/lib/types/eventTypes";

interface IPurchase {
  _id: string;
  user: Iuser;
  event: Ievent;
  date: Date;
  totalTickets: number;
}

const PurchaseModel = new mongoose.Schema<IPurchase>(
  {
    _id: {
      type: String,
      required: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UsersModel",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventsModel",
      required: true,
    },
    date: { type: Date, required: true },
    totalTickets: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.PurchasesModel ||
  mongoose.model<IPurchase>("PurchasesModel", PurchaseModel);
