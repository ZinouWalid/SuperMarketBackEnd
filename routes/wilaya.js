var express = require("express");
var router = express.Router();
let Wilayas = require("../Models/WilayasSchema");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello walid");
});

router.post("/get_all_wilayas", function (req, res, next) {
  Wilayas.find({}, (err, docs) => {
    if (err) res.json(err);
    else res.json({ wilayas: docs });
  });
});

router.post("/get_communes_by_wilayas", function (req, res, next) {
  Wilayas.find({ name: req.body.wilaya }, (err, docs) => {
    if (err) res.json(err);
    else res.json({ wilayas: docs });
  });
});

router.post("/modify_price", function (req, res, next) {
  Wilayas.updateOne(
    { name: req.body.wilaya, "cities.name": req.body.commune },
    { $set: { "cities.$.price": req.body.price } },
    (err, result) => {
      if (result.modifiedCount == 0)
        return res.status(400).json({ status: 400 });
      return res.json({ status: 200 });
    }
  );
});

module.exports = router;
