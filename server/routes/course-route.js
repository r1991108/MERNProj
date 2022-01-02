const router = require("express").Router();
const Course = require("../models").courseModel;

const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

// searching for all lectures
router.get("/", (req, res) => {
  Course.find({})
    .populate("instructor", ["role", "email"])
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send("Error! cannot get course!!");
    });
});

// searching for lecture
router.get("/:_id", (req, res) => {
  let { _id } = req.params;
  Course.findOne({ _id })
    .populate("instructor", ["email"])
    .then((course) => {
      res.send(course);
    })
    .catch((e) => {
      res.send(e);
    });
});

// searching for instructor
router.get("/instructor/:_instructor_id", (req, res) => {
  let { _instructor_id } = req.params;
  Course.find({ _instructor_id })
    .populate("instructor", ["username", "email"])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send("cannot get course data.");
    });
});

// searching for student
router.get("/student/:_student_id", (req, res) => {
  let { _student_id } = req.params;
  Course.find({ students: _student_id })
    .populate("instructor", ["username", "email"])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send("cannot get data.");
    });
});

// searching for courses
router.get("/findByName/:name", (req, res) => {
  let { name } = req.params;
  Course.find({ title: name })
    .populate("instructor", ["username", "email"])
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(500).send("cannot find course.");
    });
});

// enroll a course
router.post("/enroll/:_id", async (req, res) => {
  console.log("enrolling");
  let { _id } = req.params;
  let { user_id } = req.body;
  try {
    // console.log("try");
    let course = await Course.findOne({ _id });
    // console.log("1 >" + Array.isArray(course));
    // console.log("1 >" + course.students);
    // console.log("1 >" + course[students]);
    course.students.push(user_id);
    await course.save();
    // console.log("2 >" + course.students);
    res.send("Done Enrollment.");
  } catch (err) {
    // console.log("catch");
    console.log(err);
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  //validate the inputs before making a new course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { title, description, price } = req.body;
  console.log(req);
  console.log(req.user.isInstructor());
  if (req.user.isStudent()) {
    return res.status(400).send("only instructor can post a new course.");
  }

  let newCourse = new Course({
    title,
    description,
    price,
    instructor: req.user._id,
  });

  try {
    await newCourse.save();
    res.status(200).send("new course has been saved.");
  } catch (err) {
    res.status(400).send("cannot save course.");
  }
});

router.patch("/:_id", async (req, res) => {
  //validate the inputs before making a new course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400) / send(error.details[0].message);

  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "course not found.",
    });
  }
  console.log(course);
  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then(() => {
        res.send("Course updated.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Only the instructor or admin can update the course",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "course not found.",
    });
  }
  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    Course.deleteOne({ _id })
      .then(() => {
        res.send("Course deleted.");
      })
      .catch((e) => {
        res.send({
          success: false,
          message: e,
        });
      });
  } else {
    res.status(403);
    return res.json({
      success: false,
      message: "Only the instructor or admin can delete the course",
    });
  }
});

module.exports = router;
