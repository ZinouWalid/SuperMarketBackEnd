var express = require("express");
var router = express.Router();
let Product = require("../Models/ProductSchema");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("hello walid");
});

router.post("/get_pages_productes", function (req, res, next) {
  if (req.body.category == "All") {
    Product.find({}, (err, docs) => {
      if (err) res.json(err);
      else res.json({ product: docs });
    })
      .limit(req.body.limit)
      .skip(req.body.limit * req.body.currentPage);
  } else {
    Product.find({ category: req.body.category }, (err, docs) => {
      if (err) res.json(err);
      else res.json({ product: docs });
    })
      .limit(req.body.limit)
      .skip(req.body.limit * req.body.currentPage);
  }
});

router.post("/get_product_view", function (req, res, next) {
  Product.findOne({ _id: req.body.id }, (err, docs) => {
    if (err) res.json(err);
    else res.json({ product: docs });
  });
});

router.post("/get_product_with_category_forpages", function (req, res, next) {
  if (req.body.category == "All") {
    Product.find({}, (err, docs) => {
      if (err) res.json(err);
      else res.json({ product: docs });
    });
  } else {
    Product.find({ category: req.body.category }, (err, docs) => {
      if (err) res.json(err);
      else res.json({ product: docs });
    });
  }
});

router.post("/get_product_with_category", function (req, res, next) {
  let query = {};
  if (req.body.category !== "All") {
    query.category = req.body.category;
  }

  Product.find(query, (err, docs) => {
    if (err) res.json(err);
    else res.json({ product: docs });
  }).limit(req.body.limit);
});

// superMarket side

router.post("/search_product_forpages", function (req, res, next) {
  Product.find({ $text: { $search: req.body.tags } }, (err, docs) => {
    if (err) res.json(err);
    else res.json({ product: docs });
  });
});

router.post("/search_product", function (req, res, next) {
  Product.find({ $text: { $search: req.body.tags } }, (err, docs) => {
    if (err) res.json(err);
    else res.json({ product: docs });
  })
    .limit(req.body.limit)
    .skip(req.body.limit * req.body.currentPage);
});

router.post("/get_pages_productes_superMarket", function (req, res, next) {
  if (req.body.SearchBoolean) {
    Product.find({ $text: { $search: req.body.tags } }, (err, docs) => {
      if (err) res.json(err);
      else res.json({ product: docs });
    })
      .limit(req.body.limit)
      .skip(req.body.limit * req.body.currentPage);
  } else {
    Product.find({}, (err, docs) => {
      if (err) res.json(err);
      else res.json({ product: docs });
    })
      .limit(req.body.limit)
      .skip(req.body.limit * req.body.currentPage);
  }
});

router.post("/delete_product", function (req, res, next) {
  Product.deleteOne({ _id: req.body.id }, (err, docs) => {
    if (err) res.json(err);
    else res.json({ product: docs });
  });
});

router.post("/modify_product", function (req, res, next) {
  Product.updateOne(
    { id: req.body.id },
    {
      name: req.body.name,
      price: req.body.price,
      promotion: req.body.promotion,
      rating: req.body.rating,
      category: req.body.category,
      img: req.body.img,
      tags: req.body.tags,
    },
    {
      timestamps: false,
    },
    (err, result) => {
      if (result.modifiedCount == 0)
        return res.status(400).json({ status: 400 });
      return res.json({ status: 200 });
    }
  );
});

router.post("/add_product", function (req, res, next) {
  let NewProduct = new Product(
    {
      name: req.body.name,
      price: req.body.price,
      rating: req.body.rating,
      category: req.body.category,
      img: req.body.img,
      tags: req.body.tags,
      promotion: req.body.promotion,
    },
    {
      timestamps: false,
    }
  );

  NewProduct.save((err, doc) => {
    if (err) return res.send("Error");

    console.log({ doc });
    res.send("success!");
  });
});

router.post("/get_pages", function (req, res, next) {
  Product.find({}, (err, docs) => {
    if (err) res.json(err);
    else res.json({ product: docs });
  }).count();
});

module.exports = router;
