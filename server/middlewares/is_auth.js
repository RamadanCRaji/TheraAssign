const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { authorize } = require("passport");
dotenv.config({ path: "./config/config.env" });

module.exports = {
   authorizer: function (req, res, next) {
      const authHeader = req.header("Authorization");

      if (!authHeader) {
         return res.status(401).json({ error: "Unauthorized, Access Denied" });
      }

      const access_token = authHeader.split(" ")[1];
      console.log({ access_token });

      try {
         // Verify the token and save it in the variable
         const secret = process.env.SECRET;
         const decodedToken = jwt.verify(access_token, secret);
         console.log({ decodedToken });

         // Attach the decoded token to the request object for further use
         req.user = decodedToken;

         next();
      } catch (err) {
         console.error("Token verification failed:", err);
         res.status(401).json({ error: "Unauthorized, Access Denied" });
      }
   },
};
