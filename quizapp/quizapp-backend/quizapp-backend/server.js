const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;
const corsOption = require("./utils/corsOption");

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(corsOption);

//routes
app.get("/", (req, res) => {
  res.send("Event is API server running");
});
app.use("/name", require("./routes/nameRoute"));

//MongoDB connection
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e) => {
    e
      ? console.log(`Error connecting to database /n ${e}`)
      : console.log(`Successfully connected to the database`);
  }
);

//Server listening on port
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
