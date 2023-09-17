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
      tokenService.storeRefreshToken(refreshToken, user._id);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });
      const userDto = new UserDto(user);
      res.json({ user: userDto, auth: true });
    } catch (error) {
      console.log(error);
    }
  }
  async refresh(req, res) {
    // get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    // check if token is valid
    // console.log(refreshTokenFromCookie);
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // Check if token is in db
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // check if valid user
    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    // Generate new tokens
    const { refreshToken, accessToken } = tokenService.generateToken({
      _id: userData._id,
    });

    // Update refresh token
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // response
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }
  async logout(req, res) {
    const { refreshToken } = req.cookies;
    // delete refresh token from db
    await tokenService.removeToken(refreshToken);
    // delete cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: null, auth: false });
  }
}

export default new AuthController();
