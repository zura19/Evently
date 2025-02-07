"use server";
import { auth } from "@/app/auth";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";

export const getUserById = async (id: string) => {
  await connectToDB();
  const user = await User.findById(id).select("-password -__v");
  return user;
};

export const getUsersByUsername = async (username: string) => {
  if (!username) return;
  await connectToDB();
  const users = await User.find({
    username: username
      ? { $regex: username, $options: "i" }
      : { $exists: true },
  }).select("username email image");

  return users;
};

export const updateUserAction = async (
  id: string,
  data: { image?: string; username?: string; email?: string; role?: string }
) => {
  const session = await auth();

  if (!session?.user) return { error: "Not authorized" };

  // console.log(session.user.role);

  // @ts-expect-error role
  if (session?.user?.id !== id && session?.user?.role !== "admin") {
    return { error: "You don't have permission to update this user." };
  }

  if (!data) return { error: "No data provided" };

  if (data.username) {
    const isUsernameExists = await User.findOne({ username: data.username });
    if (isUsernameExists && isUsernameExists._id !== id)
      return { error: "Username already exists" };
  }

  if (data.email) {
    const isEmailExists = await User.findOne({ email: data.email });

    if (isEmailExists && isEmailExists._id !== id)
      return { error: "Email already exists" };
  }

  await connectToDB();
  await User.findByIdAndUpdate(id, data, { new: true });

  revalidatePath(`/profile/${id}`);
  return { success: "User updated successfully" };
};

export const bookmarkAction = async (eventId: string) => {
  try {
    const userId = (await auth())?.user?.id;
    if (!userId) return { error: "Not authorized" };

    await connectToDB();

    // Find user first
    const user = await User.findById(userId);
    if (!user) return { error: "User not found" };

    // Check if eventId is already bookmarked
    const isBookmarked = user.bookmarks.includes(eventId);

    // Toggle bookmark (add if not present, remove if present)
    await User.findByIdAndUpdate(
      userId,
      isBookmarked
        ? { $pull: { bookmarks: eventId } } // Remove eventId
        : { $addToSet: { bookmarks: eventId } }, // Add eventId
      { new: true }
    );

    revalidatePath(`/event/${eventId}`);
    revalidatePath(`/profile/${userId}/bookmarks`);

    return {
      success: isBookmarked
        ? "Event removed from bookmarks"
        : "Event bookmarked successfully",
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};
