let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let WilayasSchema = new Schema(
  {
    name: String,
    img: String,
    showed: Boolean,
    AdLink: String,
  },
  { timestamps: true }
);

const Wilayas = mongoose.model("Wilayas", WilayasSchema);

module.exports = Wilayas;
