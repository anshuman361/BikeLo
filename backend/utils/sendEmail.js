import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, otp) => {
  await resend.emails.send({
    from: "BikeLo <onboarding@resend.dev>",
    to: email,
    subject: "BikeLo Email Verification",
    text: `Your OTP is ${otp}. It expires in 10 minutes.`,
  });
};

export default sendEmail;
