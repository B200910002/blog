const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  lesson_code: {
    type: String,
    require: true,
    uppercase: true,
  },
  lesson_name: { type: String, require: true },
  lesson_credit: { type: Number, require: true },
  seventy_grade: Number,
  thirty_exam_grade: Number,
  total_grade: Number,
  letter_grade: String,
});

module.exports.Grade = mongoose.model("Grade", gradeSchema);
