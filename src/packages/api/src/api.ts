import express from "express";
import multer from "multer";
import { requireAuth } from "./auth";
import { saveFile } from "./files";
import fs from "fs";
import config from "./config";

export function makeApi() {
  if (!fs.existsSync(config.uploadDest)) {
    fs.mkdirSync(config.uploadDest);
  }

  const app = express();

  const upload = multer({ storage: multer.memoryStorage() });

  app.get("/api/health", function (_req, res) {
    res.sendStatus(204);
  });

  app.post(
    "/api/upload",
    requireAuth(),
    upload.single("file"),
    async function (req, res) {
      if (req.file == null) {
        return res.sendStatus(400);
      }

      const result = await saveFile(req.file.buffer, req.file.originalname);

      res.json(result);
    }
  );

  app.use(express.static(config.uploadDest));

  return app;
}
