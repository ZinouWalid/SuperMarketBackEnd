let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AdsSchema = new Schema(
  {
    name: String,
    img: String,
    showed: Boolean,
    AdLink: String,
  },
  { timestamps: true }
);

const Ads = mongoose.model("Ads", AdsSchema);

module.exports = Ads;
