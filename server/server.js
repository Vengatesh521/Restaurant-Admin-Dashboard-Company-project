require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");

const app = express();

connect();

app.use(cors());
app.use(express.json());

/* ✅ Welcome route */
app.get("/", (req, res) => {
  console.log("✅ Base URL '/' was accessed");
  res.send("🚀 API Working");
});

app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server started on http://localhost:${process.env.PORT}`),
);
