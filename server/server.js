/*
==============================================
Import core node module for server operations
==============================================
*/
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");

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
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(express.json()); // Parses JSON bodies

// Method override
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
const authRouter = require("./routes/api");
const wheelChairRoutes = require("./routes/wheelChairRoutes");
app.use("/api/", authRouter); // Mount the auth router
app.use("/api/wheelchair/", wheelChairRoutes); // Mount the auth router
app.use("/api/rooms/", authRouter); // Mount the auth router
app.use("/api/patient/", authRouter); // Mount the auth router

// Define the default port using environment variable with a fallback
const PORT = process.env.PORT || 8000;

// Start the server and log the mode and port it's running on
app.listen(PORT, () => {
   console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
   );
});

/**
 * Create a middleware to handle authentication
 *
 */
