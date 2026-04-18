require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path"); 
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRouts");
const expenseRoutes = require("./routes/expenseRouts");
const dashboardRoutes = require("./routes/dashboardRoutes");
const goalRoutes = require("./routes/goalRoutes")

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense" , expenseRoutes);
app.use("/api/v1/dashboard" , dashboardRoutes);
app.use("/goal",goalRoutes)
app.use("/uploads" , express.static(path.join(__dirname , "uploads")))

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*all", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
