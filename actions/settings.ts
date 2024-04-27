"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/utils/user";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) return { error: "Unauthorized" };

  const dbuser = await getUserById(user.id!);
  if (!dbuser) return { error: "Unauthorized" };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "EMail already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent" };
  }

  if (values.password && values.newPassword && dbuser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbuser.password
    );

    if (!passwordMatch) return { error: "Incorrect password!" };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbuser.id,
    },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated!" };
};
