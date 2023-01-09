require("dotenv").config();
const express = require("express");
const connectDB = require("./models/index");
const mongoose = require("mongoose");
const cors = require("cors");
const { product, article, users, cart } = require("./router");

mongoose.set("strictQuery", false);

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/", [product, article, users, cart]);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
