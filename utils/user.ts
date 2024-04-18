"use server";
import { db } from "@/lib/db";
import { error } from "console";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) return null;

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
