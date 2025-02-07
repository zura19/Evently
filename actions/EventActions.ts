"use server";
import Event from "@/models/eventModel";
import { connectToDB } from "@/lib/connectToDB";
import { auth } from "@/app/auth";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";

export async function createEvent({
  data,
}: {
  data: {
    author: string;
    startDate: Date;
    endDate: Date;
    tickets: number;
    name: string;
    category: string;
    image: string;
    location: string;
    description: string;
    price: number;
  };
}) {
  try {
    const session = await auth();
    // @ts-expect-error role
    if (!session?.user || session?.user?.role === "user") {
      return {
        error:
          "Not authorized or You don't have permission to create an event.",
      };
    }

    await connectToDB();
    const isEventExists = await Event.findOne({ name: data?.name });
    if (isEventExists) {
      return { error: "Event already exists" };
    }

    // Generate ticket entries for each day
    const tickets = [];

    // eslint-disable-next-line prefer-const
    let currentDate = new Date(data?.startDate);
    while (currentDate <= data?.endDate) {
      tickets.push({
        date: new Date(currentDate),
        remainingTickets: data?.tickets,
      });
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    const event = new Event({
      name: data?.name,
      author: data.author,
      category: data.category,
      image: data.image,
      location: data.location,
      description: data.description,
      price: data.price,
      startDate: data.startDate,
      endDate: data.endDate,
      tickets: tickets,
    });

    await event.save();

    return { success: "Event created successfully" };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEvents({
  query,
  minPrice,
  maxPrice,
  category,
  location,
  page,
  limit,
}: {
  query?: string;
  minPrice?: string;
  maxPrice?: string;
  category?: string;
  location?: string;
  page?: string;
  limit?: string;
}) {
  try {
    console.log(page);
    await connectToDB();
    console.log(category?.split("-"));
    const events = await Event.find({
      name: query ? { $regex: query, $options: "i" } : { $exists: true },
      price: {
        $gte: Number(minPrice) || 0,
        $lte: maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER,
      },
      category: category ? { $in: category.split("-") } : { $exists: true },
      location: location
        ? { $regex: location, $options: "i" }
        : { $exists: true },
    })
      .limit(Number(limit) || 10)
      // .skip((Number(page) - 1) * 10)

      .populate("author", "username")
      .select("-__v -tickets");
    return events;
  } catch (error) {
    console.error(error);
  }
}

export async function getEvent(id: string) {
  try {
    const userId = (await auth())?.user?.id;
    await connectToDB();
    const event = await Event.findById(id)
      .populate("author", "username")
      .select("-__v");

    if (!event) return { error: "Event not found" };
    const user = await User.findById(userId);
    const isBookmarked = user?.bookmarks?.includes(id);

    return { event, isBookmarked };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteEventAction(id: string) {
  try {
    const user = (await auth())?.user;

    if (!user)
      return {
        error: "Not authorized",
      };

    await connectToDB();

    const findEvent = await Event.findById(id);
    // @ts-expect-error role
    if (user.role !== "user" || findEvent?.author._id.toString() === user.id) {
      await Event.findByIdAndDelete(id);

      revalidatePath(`/event/${id}`);
      revalidatePath("/events");

      return {
        success: "Event deleted successfully",
      };
    } else {
      return {
        error: "You don't have permission to delete this event",
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
