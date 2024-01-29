const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_ID,
  process.env.TWILIO_AUTH_TOKEN
);

function sendOtpToMobileNumber(fromPhoneNumber, toPhoneNumber) {
  client.messages
    .create({
      from: fromPhoneNumber,
      to: toPhoneNumber,
      body: "Your Otp Is:- ",
    })
    .then((res) => {
      console.log("message sent");
    })
    .catch((error) => {
      console.log(error.messsage);
    });
}

module.exports = { sendOtpToMobileNumber };
