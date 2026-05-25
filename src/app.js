const express = require("express");
require("../db/mongoose");
const loginRouter = require("../routes/login");
const registerRouter = require("../routes/register");
const errorHandler = require("../controller/errorHandler");
require("dotenv").config();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(registerRouter);
app.use(loginRouter);

app.use(errorHandler);

// app.use();

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
