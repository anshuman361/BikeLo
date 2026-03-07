import SibApiV3Sdk from "sib-api-v3-sdk";

const sendEmail = async (email, otp) => {
  const client = SibApiV3Sdk.ApiClient.instance;

  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const sendSmtpEmail = {
    to: [{ email: email }],
    sender: {
      email: "yourbrevoemail@gmail.com",
      name: "BikeLo",
    },
    subject: "BikeLo Email Verification",
    textContent: `Your OTP is ${otp}. It expires in 10 minutes.`,
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};

export default sendEmail;
