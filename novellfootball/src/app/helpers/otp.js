import nodemailer from "nodemailer";

export async function sendPhoneOtp(number, otp) {
  try {
    let baseUrl = "https://www.fast2sms.com/dev/bulkV2";
    const querParams = new URLSearchParams({
      authorization:
        "w0d8sQkyt4aIiJ5BcKFfVPxLueZSXoMqATgmUlW1G97Y6NvjzRhBczyNPs9SXtpU6jMurlLqGwavWZJ5",
      variables_values: `${otp}`,
      route: "otp",
      numbers: number,
    });
    const headers = {
      "cache-control": "no-cache",
    };
    const url = `${baseUrl}?${querParams.toString()}`;

    let res = await fetch(url, { method: "GET", headers });

    res = await res.json();
    if (!res) throw Error("Server error");
    if (res?.return === true) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export async function sendEmailOtp(EmailId, otp) {
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
      to: "vilovishwakarma@gmail.com",
      subject: "Manchester football",
      text: `Your OTP for varification is ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
}
