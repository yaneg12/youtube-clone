import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
  "https://localhost:3000",
  /https:\/\/.*\.app\.github\.dev$/,
  /http:\/\/.*\.app\.github\.dev$/,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err: Error) => {
  console.error("Unexpected Postgres client error", err);
});

pool
  .query("SELECT 1")
  .then(() => {
    console.log("Postgres connection established");
  })
  .catch((err: Error) => {
    console.error("Postgres connection failed:", err.message);
  });

app.get("/", (_req, res) => {
  res.json({ message: "YouTube Clone backend is running" });
});

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(503).json({ status: "error" });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
