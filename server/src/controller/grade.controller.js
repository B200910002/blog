const { Grade } = require("../model/Grade.model");

exports.getAll = async (req, res, next) => {
  try {
    const grades = await Grade.find();
    res.status(200).json(grades);
  } catch (err) {
    // next(err);
    res.status(201).json(err.message);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const grade = await User.create({ name: name, age: age });
    res.status(200).json(grade);
  } catch (err) {
    // next(err);
    res.status(201).json(err.message);
  }
};

exports.import = async (req, res, next) => {
  try {
    const grades = req.body;
    grades.map(async (grade) => {
      await Grade.create({
        lesson_code: grade.lesson_code,
        lesson_name: grade.lesson_name,
        lesson_credit: grade.lesson_credit,
        seventy_grade: grade.seventy_grade,
        thirty_exam_grade: grade.thirty_exam_grade,
        total_grade: grade.total_grade,
        letter_grade: grade.letter_grade,
      });
    });

    res.status(200).json(grades);
  } catch (err) {
    // next(err);
    res.status(201).json(err.message);
  }
};
