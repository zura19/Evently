import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(1, "Username is required")
    .max(20, "Too long username"),

  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Enter valid email"),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long.")
    .max(32, "Password must not exceed 32 characters.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter.")
    .regex(/\d/, "Password must include at least one number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must include at least one special character."
    ),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required"),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

export const resetSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Enter valid email"),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long.")
      .max(32, "Password must not exceed 32 characters.")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
      .regex(/[a-z]/, "Password must include at least one lowercase letter.")
      .regex(/\d/, "Password must include at least one number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character."
      ),
    repeatPassword: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export const createEventSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(255, { message: "Title must be at most 255 characters" }),
  category: z.string().nonempty({ message: "Category is required" }),
  location: z.string().nonempty({ message: "Location is required" }),
  price: z.number().min(1, { message: "Price must be at least $1.00" }),
  description: z.string(),
  tickets: z.number().min(1, { message: "Tickets must be at least 1" }),
  image: z.string().min(1, { message: "Image is required" }),
});

export const imageSchema = z.object({
  image: z.string().min(1, { message: "Image is required" }),
});

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(255, { message: "Name must be at most 255 characters" }),

  email: z.string().email("Enter valid email"),
  role: z.enum(["user", "moderator", "admin"]),
});
