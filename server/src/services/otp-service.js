import crypto from "crypto";
import twilioSer from "twilio";

import {
  SMS_AUTH_TOKEN,
  SMS_FROM_NUMBER,
  SMS_SID,
} from "../../config/config.js";
import hashService from "./hash-service.js";
const twilio = twilioSer(SMS_SID, SMS_AUTH_TOKEN, {
  lazyLoading: true,
});
class OtpService {
  async generateOtp() {
    const opt = crypto.randomInt(1000, 9999);
    return opt;
  }
  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: SMS_FROM_NUMBER,
      body: `Your coder house OTP is ${otp}`,
    });
  }
  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    if (computedHash === hashedOtp) {
      return true;
    }

    return false;
  }
  sendByEmail() {}
}

export default new OtpService();
