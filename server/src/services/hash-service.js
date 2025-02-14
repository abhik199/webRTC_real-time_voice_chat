import crypto from "crypto";
import { HASH_SECRET } from "../../config/config.js";
class HashService {
  hashOtp(data) {
    return crypto.createHmac("sha256", HASH_SECRET).update(data).digest("hex");
  }
}
export default new HashService();
