import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {},
});

export const Course = mongoose.model("Course", schema);
