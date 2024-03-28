import { sendEmailOtp } from "./otp";

export default async function ErrorReport(error) {
  try {
    await sendEmailOtp("tester@gmail.com", JSON.stringify(error));
  } catch (error) {
    console.log(error);
  }
}

async function sendEmailOtp(EmailId, error) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manchestercityfootbaal24@gmail.com",
        pass: "xcjmrimqkkvgueau",
      },
    });

    let mailOptions = {
      from: "manchesterfootbaal24@gmail.com",
      to: `${EmailId}`,
      subject: "Error",
      text: `${error}`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
}
