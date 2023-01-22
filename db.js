const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // loads environment variables from .env file

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose default connection is open");
});

db.on("error", (err) => {
  console.log(`Mongoose default connection has occured ${err} error`);
});

db.on("disconnected", () => {
  console.log("Mongoose default connection is disconnected");
});

process.on("SIGINT", () => {
  db.close(() => {
    console.log(
      "Mongoose default connection is disconnected due to application termination"
    );
    process.exit(0);
  });
});

require("./models/Project");
require("./models/Task");
require("./models/User");
