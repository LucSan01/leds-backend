import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {},
});

export const Order = mongoose.model("Order", schema);
