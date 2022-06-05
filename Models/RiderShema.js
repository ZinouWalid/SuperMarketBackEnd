let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let riderSchema = new Schema(
  {
    id: String,
    date: String,
    name: String,
    email: String,
    phoneNumber: String,
    haveMoto: String,
    havePermis: Boolean,
    militaryFree: Boolean,
    region: String,
    startingDate: String,
    password: String,
  },
  { timestamps: true }
);

const Rider = mongoose.model("rider", riderSchema);

module.exports = Rider;
