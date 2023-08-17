import UserDto from "../dtos/user-dto.js";
import hashService from "../services/hash-service.js";
import otpService from "../services/otp-service.js";
import tokenService from "../services/token-service.js";
import userService from "../services/user-service.js";
class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res
        .status(400)
        .json({ status: false, message: "Phone field is required" });
    }
    try {
      // generate 4 digit otp
      const otp = await otpService.generateOtp();
      // hash Otp
      const ttl = 1000 * 60 * 2; // 2 min
      const expires = Date.now() + ttl;
      const data = `${phone}.${otp}.${expires}`;
      const hash = hashService.hashOtp(data);

      // send otp
      try {
        // await otpService.sendBySms(phone, otp);
        return res.json({
          hash: `${hash}.${expires}`,
          phone,
          otp,
        });
      } catch (error) {
        console.log(error);
      }

      res.json({ hash, data });
    } catch (error) {
      console.log(error);
    }
  }
  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res
        .status(400)
        .json({ status: false, message: "All field are required" });
    }

    try {
      const [hashedOtp, expires] = hash.split(".");
      if (Date.now() > expires) {
        res.status(400).json({ status: false, message: "OTP expired" });
      }
      const data = `${phone}.${otp}.${expires}`;
      const isValid = otpService.verifyOtp(hashedOtp, data);
      if (!isValid) {
        res.status(400).json({ status: false, message: "Invalid OTp" });
      }
      let user;
      try {
        user = await userService.findUser({ phone: phone });
        if (!user) {
          user = await userService.createUser({ phone: phone });
        }
      } catch (error) {
        console.log(error);
      }
      // token
      const { accessToken, refreshToken } = tokenService.generateToken({
        _id: user._id,
        activated: false,
      });
      res.cookie("refreshtoken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      const userDto = new UserDto(user);
      res.json({ accessToken, user: userDto });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new AuthController();
