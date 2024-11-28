const mongoose = require("mongoose");

exports.connectToDb = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed To Connect To MongoDb", error);
  }
};
