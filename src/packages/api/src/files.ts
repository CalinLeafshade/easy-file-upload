import fs from "fs/promises";
import crypto from "crypto";
import path from "path";
import config from "./config";

export async function saveFile(buffer: Buffer, filename: string) {
  const key = crypto.randomBytes(12).toString("hex");
  const ext = path.extname(filename);
  const fullFile = `${key}${ext}`;

  await fs.writeFile(path.join(config.uploadDest, fullFile), buffer);

  return {
    filename: fullFile,
  };
}
