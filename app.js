var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var productRouter = require("./routes/product");
var adsRouter = require("./routes/ads");
var wilayasRouter = require("./routes/wilaya");

var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://zineddine_walid:mongodb1209@cluster0.o2k2b.mongodb.net/pfe?retryWrites=true&w=majority",
  function (error) {
    if (error) {
      console.log("error" + error);
    } else {
      console.log("open done");
    }
  }
);

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/product", productRouter);
app.use("/ads", adsRouter);
app.use("/wilaya", wilayasRouter);

module.exports = app;
