const mongoose = require("mongoose");
const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const tasks = mongoose.model("Task", tasksSchema);

module.exports = tasks;
