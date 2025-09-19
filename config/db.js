const mongoose = require("mongoose");
const dbURI =
  "mongodb+srv://nodeTest:Omofolarin123@node.druqiye.mongodb.net/?retryWrites=true&w=majority&appName=node";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
