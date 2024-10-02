/*
==============================================
Import core node module for server operations
==============================================
*/
const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");

/*
==================================================================
Import environment configuration, routes, and database connection utilities
==================================================================
*/
const dotenv = require("dotenv"); // Manages environment-specific configuration
dotenv.config({ path: "./config/config.env" }); // Load environment variables from the specified dotenv file
const connectDB = require("./config/db"); // Handles database connection logic

// Initialize Express application
const app = express();

// Connect to MongoDB
connectDB();

// Apply middlewares for request data handling
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Parses URL-encoded bodies

// Method override to support legacy HTTP methods
app.use(
   methodOverride(function (req, res) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
         // Look in urlencoded POST bodies and delete it
         let method = req.body._method;
         delete req.body._method;
         return method;
      }
   })
);

// Logging requests in development mode
if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

// API routes
const authentication = require("./routes/api");
const wheelChairRouter = require("./routes/wheelChairRoutes");
const roomsRouter = require("./routes/roomRoutes");
const dashBoardRouter = require("./routes/dashBoardInfoRoutes");
const patientRouter = require("./routes/patientRoutes");

app.use("/api/auth", authentication); // Mount the authentication router
app.use("/api/dashBoardInfo", dashBoardRouter); // Mount the dashboard info router
app.use("/api/wheelchair", wheelChairRouter); // Mount the wheelchair management router
app.use("/api/rooms", roomsRouter); // Mount the room management router
app.use("/api/patient", patientRouter); // Mount the patient management router

// Define the default port using environment variable with a fallback
const PORT = process.env.PORT || 8000;

// Start the server and log the mode and port it's running on
app.listen(process.env.PORT || PORT, () => {
   console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
   );
});
