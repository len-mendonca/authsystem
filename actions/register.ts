"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/utils/user";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validateFields.data;
  try {
    const getExistingUser = await getUserByEmail(email);

    if (getExistingUser) {
      console.log(getExistingUser);
      return { error: "Email already in use!" };
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name,
        email,
        password: hasedPassword,
      },
    });

    return { success: "User created" };
  } catch (error) {
    return { error: "Something went wrong with the server" };
  }
};
