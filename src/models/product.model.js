const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price:{type:Number, required:true},
    image_urls:[{type:String,required:true}]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
