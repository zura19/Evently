"use server";
import { signIn, signOut } from "@/app/auth";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import crypto from "crypto";
import { Resend } from "resend";
import ResetPasswodTemplate from "@/email/ResetPasswordTemplate";

export const signUpAction = async (data: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    await connectToDB();

    const isEmailExists = await User.findOne({ email: data.email });
    if (isEmailExists) {
      return { error: "Email already exists" };
    }

    const isUsernameExists = await User.findOne({ username: data.username });
    if (isUsernameExists) {
      return { error: "Username already exists" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    return { success: "User created successfully!" };
  } catch (err) {
    throw err;
  }
};

export const signInAction = async (data: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: err.message };
      }
    }
  }
};

export const signOutAction = async () => {
  try {
    await signOut();
  } catch (err) {
    throw err;
  }
};

const resend = new Resend(process.env.RESEND_API_KEY!);

export const resetPasswordAction = async (data: { email: string }) => {
  try {
    await connectToDB();
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return { error: "User with this email not found" };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hours

    user.resetToken = resetToken;
    user.resetTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_SERVER_URL}/resetPassword/${resetToken}`;

    await resend.emails.send({
      from: `Evently Support <${process.env.SENDER_EMAIL}>`,
      to: data.email,
      subject: "Password Reset",
      react: <ResetPasswodTemplate resetLink={resetLink} />,
    });
    return { success: "Password reset email sent successfully" };
  } catch (err) {
    throw err;
  }
};

export const newPasswordAction = async (data: {
  password: string;
  repeatPassword: string;
  resetToken: string;
}) => {
  if (data.password !== data.repeatPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    await connectToDB();
    const user = await User.findOne({
      resetToken: data.resetToken,
      resetTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return { error: "Invalid reset token or token has expired" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await user.save();
    return { success: "Password reset successfully" };
  } catch (err) {
    throw err;
  }
};
