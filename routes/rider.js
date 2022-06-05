var express = require("express");
var router = express.Router();
let Rider = require("../Models/RiderShema");

/* GET users listing. */
router.get("/walid", function (req, res, next) {
  res.send("Hello riders");
});

module.exports = router;
