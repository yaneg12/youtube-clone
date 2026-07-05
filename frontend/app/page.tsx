"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const [message, setMessage] = useState("Checking backend connection...");

  useEffect(() => {
    const apiBase = typeof window === "undefined" ? "http://localhost:5000" : window.location.origin;

    fetch(`${apiBase}/api/health`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Backend health check failed");
        }

        const data = await response.json();

        if (data.status === "ok") {
          setStatus("connected");
          setMessage("Backend is connected.");
        } else {
          throw new Error("Unexpected health response");
        }
      })
      .catch((error) => {
        setStatus("error");
        const errorMessage = error instanceof Error ? error.message : "Backend is unavailable.";
        console.error("Backend health check failed:", error);
        setMessage(errorMessage);
      });
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>YouTube Clone</h1>
      <p>Frontend ready. The page below checks the backend health endpoint.</p>
      <p>
        Backend status: <strong>{status === "connected" ? "Connected" : status === "error" ? "Disconnected" : "Checking..."}</strong>
      </p>
      <p>{message}</p>
    </main>
  );
}
