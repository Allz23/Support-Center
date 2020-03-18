const { Router } = require("express");
const router = Router();

const Question = require("../models/Question");

router.get("/questions", async (req, res) => {
  await Question.find({}, "title content", function(error, questions) {
    if (error) {
      console.error(error);
    }
    res.send({
      sentData: questions
    });
  }).sort({ _id: -1 });
});

router.post("/questions/add", async (req, res) => {
  let mongoDB = req.db;
  let title = req.body.title;
  let content = req.body.content;
  let newQuestion = new Question({
    title: title,
    description: content
  });

  newQuestion.save(function(error) {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: "Question added succesfully!!"
    });
  });
});

module.exports = router;
