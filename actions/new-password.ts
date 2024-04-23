"use server";

import { newPasswordSchema } from "@/schemas";
import { getResetPasswordTokenByToken } from "@/utils/passwordResetToken";
import { getUserByEmail } from "@/utils/user";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) return { error: "Missing Token" };

  const validateFields = newPasswordSchema.safeParse(values);
  if (!validateFields.success) return { error: "Invalid fields" };

  const { password } = validateFields.data;
  const existingToken = await getResetPasswordTokenByToken(token);

  if (!existingToken) return { error: "Invalid token" };
  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "User does not exist" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated" };
};
