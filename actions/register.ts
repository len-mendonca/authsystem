"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/utils/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validateFields.data;
  try {
    const getExistingUser = await getUserByEmail(email);

    if (getExistingUser) {
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

    const verificationTOken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationTOken.email,
      verificationTOken.token
    );

    return { success: "Confirmation email sent" };
  } catch (error) {
    return { error: "Something went wrong with the server" };
  }
};
