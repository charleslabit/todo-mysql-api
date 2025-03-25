import dotenv from "dotenv";
import express from "express";
import todoRoutes from "./routes/todos.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Routes
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
