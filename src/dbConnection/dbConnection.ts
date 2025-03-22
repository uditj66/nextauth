import mongoose from "mongoose";

const connectDb = async function () {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo-DB connected succesfully");
    });

    connection.on("error", (error) => {
      console.log(
        "Mongo-DB connection error ,please make sure DB is up and running :  " +
          error
      );
    });
  } catch (error) {
    console.log("Something went wrong while connecting to Mongo-DB :", error);
  }
};

export default connectDb;
