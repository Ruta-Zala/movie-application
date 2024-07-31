const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
