import crypto from "crypto";

const a = crypto.randomBytes(64).toString("hex");

console.log(a);
