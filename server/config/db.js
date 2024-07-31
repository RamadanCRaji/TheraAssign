const { default: mongoose } = require("mongoose");

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {});
      console.log(`mongoDB connected: ${conn.connection.host}`);
   } catch (error) {
      console.error(`we had an error connection to the db:${error.message}`);
      process.exit(1); // we are exiting with failure
   }
};
module.exports = connectDB;
