import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: String,
  description: String,
  module: String,
})

const modulesSchema = new mongoose.Schema({
    name: String,
    description: String,
    course: String,
    lessons: [moduleSchema],
  },
  { collection: "modules" });
export default modulesSchema;