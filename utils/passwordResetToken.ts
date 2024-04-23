import { db } from "@/lib/db";

export const getResetPasswordTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordToken;
  } catch (error) {
    return null;
  }
};

export const getResetPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordToken;
  } catch (error) {
    return null;
  }
};
