const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./userRoutes.js");
const path = require("path");
require("dotenv").config();

const App = express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended: true}));
App.set("view engine", "ejs");
App.set("views", path.join(__dirname, "views"));

App.use("/user", userRoutes);

App.get('/', (req, res) => {
  res.send("welcome");
})
const URL = process.env.URL || "mongodb+srv://mongoself:factorise@etiene.jjrlz2m.mongodb.net/mongo";
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected Successfully"))
  .catch((err) => console.error("ERROR", err));

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => console.log(`http://localhost:${PORT}`));