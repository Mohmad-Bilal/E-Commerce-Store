const express = require("express");
require("../db/mongoose");
const loginRouter = require("../routes/login");
const registerRouter = require("../routes/register");
// require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(registerRouter);
app.use(loginRouter);

// app.use();

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
