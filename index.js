const mongoose = require('mongoose');
const express = require('express');
const fs = require("fs");
require("dotenv").config();

// express
const app = express();
//body parser
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"));
mongoose.connection.on("error", (err) => {
  console.log(`DB connection eror :${err.message}`);
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));