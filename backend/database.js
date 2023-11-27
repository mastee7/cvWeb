const mongoose = require("mongoose");
require("dotenv");

const connectDB = async () => {
  const isTesting = false; // set to true for debugging

  try {
    const mongoURI = process.env.MONGODB_URI;
    mongoose
      .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("(database) Connected to MongoDB successfully"));

    if (isTesting == true) {
      // db connection
      SomeModel = mongoose.model(
        "SomeModel",
        new mongoose.Schema({
          attribute: {
            type: String,
            required: true,
            trim: true,
          },
        })
      );

      console.log("created someModel schema");

      attr = "test attribute";
      // create new instance of SomeModel
      newModel = new SomeModel({
        attribute: attr,
      });
      await newModel.save();

      console.log("created newModel instance");

      // To find all documents in the 'SomeModel' collection
      SomeModel.find()
        .then((documents) => console.log(documents))
        .catch((err) => console.error(err));
    }
  } catch (e) {
    console.error("Connection to MongoDB fail", e);
  }
};

module.exports = connectDB;
