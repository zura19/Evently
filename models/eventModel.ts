import mongoose, { Schema, Document, model } from "mongoose";
import { Iuser } from "./userModel";

interface Ticket {
  _id: string;
  date: Date;
  remainingTickets: number;
}

interface Event extends Document {
  _id: string;
  author: Iuser;
  name: string;
  category: string;
  image: string;
  location: string;
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  tickets: Ticket[];
}

const TicketSchema = new Schema<Ticket>({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  date: { type: Date, required: true },
  remainingTickets: { type: Number, required: true, default: 50 },
});

const EventSchema = new Schema<Event>({
  _id: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  author: { type: Schema.Types.ObjectId, ref: "UsersModel", required: true },
  name: { type: String, required: true },
  category: { type: String, required: true, default: "other" },
  image: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  tickets: [TicketSchema],
  price: { type: Number, required: true, default: 0 },
});

export default mongoose.models.EventsModel ||
  model<Event>("EventsModel", EventSchema);
