import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes..js";
import chatRouter from "./routes/chatRoute.js";

const app = express();

await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is Live!"));
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

// Port
const PORT = process.env.PORT || 3000;

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
