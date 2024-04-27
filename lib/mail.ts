import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lenmendonca2003@gmail.com",
    subject: email,
    html: `<p>click <a href="${confirmLink}">here </a>   to verify email</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lenmendonca2003@gmail.com",
    subject: email,
    html: `<p>click <a href="${confirmLink}">here </a> to reset your password</p>`,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lenmendonca2003@gmail.com",
    subject: email,
    html: `<p>Your two-factor code is ${token}</p>`,
  });
};
