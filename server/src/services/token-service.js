import jwt from "jsonwebtoken";
import refreshModel from "../models/refresh-model.js";
const access_token_secret = "jhfsjhfs56f5s4d56f4s5dffs5fsdf6d568r";
const refresh_token_secret = "fsdfsdfs54f5s4d5fqwda2s45415444544";

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, access_token_secret, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, refresh_token_secret, {
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }
  async storeRefreshToken(token, userId) {
    try {
      await refreshModel.create({
        token,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async verifyAccessToken(token) {
    return jwt.verify(token, access_token_secret);
  }
}
export default new TokenService();
