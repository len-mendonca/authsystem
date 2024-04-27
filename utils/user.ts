"use server";
import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id: string | " ") => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) return null;

    return user;
  } catch (error) {
    throw error;
  }
};
