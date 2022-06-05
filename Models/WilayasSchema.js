let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let WilayasSchema = new Schema(
  {
    id: Number,
    name: String,
    cities: [
      {
        id: Number,
        name: String,
        state_id: Number,
        state_code: String,
        state_name: String,
        country_code: String,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

const Wilayas = mongoose.model("Wilayas", WilayasSchema);

module.exports = Wilayas;
