import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";
import analyticsRoute from "./routes/AnalyticsRoute";

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI as string)   // 🔥 fixed: use MONGODB_URI
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Track server start time
const serverStartTime = Date.now();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://mern-food-ordering.netlify.app",
      "https://mern-food-ordering-hnql.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Stripe webhook raw body
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

// ✅ JSON parsing
app.use(express.json());

// ✅ Root route
app.get("/", (req: Request, res: Response) => {
  res.send(
    `<h1>🍔 Foodies.com Backend is Running!</h1>
     <p>Welcome to the API server. 
     </p>`
  );
});

// ✅ Health check
app.get("/health", (req: Request, res: Response) => {
  const uptime = Math.floor((Date.now() - serverStartTime) / 1000);
  res.json({
    message: "health OK!",
    uptime,
    timestamp: new Date().toISOString(),
    serverStartTime: new Date(serverStartTime).toISOString(),
  });
});

// ✅ Routes
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);
app.use("/api/business-insights", analyticsRoute);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
