const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect("mongodb+srv://demo:admin@cluster0.osrpc.mongodb.net/hws")
  .then(
    (result) => {
      if (result) {
        console.log("Database connection successful");
        app.listen(3000);
      }
    },
    (err) => {
      console.log(err);
      process.exit(1);
    }
  );

module.exports = app;
