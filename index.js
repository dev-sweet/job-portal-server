const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// import routes
const authRoute = require("./routes/authRoutes");
// call dotenv
require("dotenv").config();

// port
const port = process.env.PORT || 8000;

// database connection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("Database connection success!"))
  .catch((err) => console.log(err));

// app
const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use(cookieParser());
app.use(cors());

// routes
app.use("/", authRoute);

// error handler middleware
app.use(errorHandler);

// listen the app
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
