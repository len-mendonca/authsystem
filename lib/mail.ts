const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "lenmendonca2003@outlook.com",
    pass: process.env.NODEMAILER_PASS,
  },
});

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  async function main() {
    const info = await transporter.sendMail({
      from: '"AUTHV5" <lenmendonca2003@outlook.com>',
      to: email,
      subject: email,
      text: "hi?",
      html: `<p>click <a href="${confirmLink}">here </a>   to verify email</p>`,
    });
  }

  await main().catch(console.error);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-password?token=${token}`;
  async function main() {
    const info = await transporter.sendMail({
      from: '"AUTHV5" <lenmendonca2003@outlook.com>',
      to: email,
      subject: email,
      text: "hi?",
      html: `<p>click <a href="${confirmLink}">here </a> to reset your password</p>`,
    });
  }

  await main().catch(console.error);
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  async function main() {
    const info = await transporter.sendMail({
      from: '"AUTHV5" <lenmendonca2003@outlook.com>',
      to: email,
      subject: email,
      text: "hi?",
      html: `<p>Your two-factor code is ${token}</p>`,
    });
  }

  await main().catch(console.error);
};
