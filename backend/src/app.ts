
import express  from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use(userRoutes); // protegida pelo middleware
app.use("/tasks", taskRoutes); // protegida pelo middleware

export default app;