import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lenmendonca2003@gmail.com",
    subject: email,
    html: `<p>click <a href="${confirmLink}">here </a>   to verify email</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "lenmendonca2003@gmail.com",
    subject: email,
    html: `<p>click <a href="${confirmLink}">here </a> to reset your password</p>`,
  });
};