const mongoose = require("mongoose");
const toDoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", toDoSchema);
