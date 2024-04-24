import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Invalid Password" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Min 6 characters required",
  }),
});
