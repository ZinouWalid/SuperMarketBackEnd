var express = require("express");
var router = express.Router();
let Ads = require("../Models/AdsSchema");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello walid");
});

router.post("/add_ads", function (req, res, next) {
  let NewAds = new Ads({
    name: req.body.name,
    img: req.body.img,
    showed: false,
    AdLink: req.body.AdLink,
  });

  NewAds.save((err, doc) => {
    if (err) return res.send("Error");

    console.log({ doc });
    res.send("success!");
  });
});

router.post("/get_all_ads", function (req, res, next) {
  Ads.find({}, (err, docs) => {
    if (err) res.json(err);
    else res.json({ ads: docs });
  });
});

router.post("/get_showed_ads", function (req, res, next) {
  Ads.find({ showed: true }, (err, docs) => {
    if (err) res.json(err);
    else res.json({ ads: docs });
  });
});

router.post("/delete_ad", function (req, res, next) {
  Ads.deleteOne({ _id: req.body.id }, (err, docs) => {
    if (err) res.json(err);
    else res.json({ ads: docs });
  });
});

router.post("/modify_ad", function (req, res, next) {
  Ads.updateOne(
    { _id: req.body.id },
    {
      showed: !req.body.showed,
    },
    (err, result) => {
      if (result.modifiedCount == 0)
        return res.status(400).json({ status: 400 });
      return res.json({ status: 200 });
    }
  );
});

module.exports = router;
