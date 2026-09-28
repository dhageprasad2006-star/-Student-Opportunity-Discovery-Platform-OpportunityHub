const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const distPath = path.join(__dirname, "dist");

app.use(express.json());
app.use(express.static(distPath));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Student Opportunity Discovery Platform" });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});