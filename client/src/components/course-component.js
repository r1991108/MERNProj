import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import CourseService from "../services/course-service";
import { Popconfirm, message } from "antd";
import "antd/dist/antd.min.css";
const CourseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [courseData, setCourseData] = useState(null);
  let [openModal, setOpenModal] = useState(false);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [courseId, setCourseId] = useState(0);
  let [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };

  // while an instructor click update course button
  const handleUpdateCourseInfo = (courseId, title, description, price) => {
    console.log(
      "handleUpdateCourseInfo: ",
      courseId,
      title,
      description,
      price
    );
    setDescription(description);
    setPrice(price);
    setTitle(title);
    setCourseId(courseId);
    setOpenModal(true);
  };
  const confirmCancelCourse = async (courseId) => {
    console.log("cancelling the course");
    await CourseService.removeStudentFromCourse(courseId, currentUser.user._id)
      .then()
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  const handleCancelCourse = (e) => {
    setOpenModal(true);
  };

  const handleCancelChange = (e) => {
    console.log("handleCancelChange");
    setOpenModal(false);
  };

  const handleCommitChange = async (e) => {
    console.log("handleCommitChange");
    await CourseService.editCourseInfo(courseId, title, description, price)
      .then()
      .catch((err) => {
        console.log(err);
      });
    setOpenModal(false);
    // window.location.reload();
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDesciption = (e) => {
    setDescription(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    console.log("using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }

    if (currentUser.user.role == "instructor") {
      // console.log("id=" + _id);
      CourseService.get(_id)
        .then((data) => {
          if (data.data.length == 0) {
            console.log(data);
            setMessage("You haven't posted any course yet");
          } else {
            console.log(data);
            setCourseData(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (currentUser.user.role == "student") {
      // console.log("getting data for student");
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          if (data.data.length == 0) {
            console.log(data);
            setMessage("You haven't rolled any course yet");
          } else {
            console.log(data);
            setCourseData(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [openModal]);

  useEffect(() => {
    if (currentUser.user.role == "student") {
      let _id;
      if (currentUser) {
        _id = currentUser.user._id;
      } else {
        _id = "";
      }
      // console.log("getting data for student");
      CourseService.getEnrolledCourses(_id)
        .then((data) => {
          if (data.data.length == 0) {
            console.log(data);
            setMessage("You haven't rolled any course yet");
          } else {
            console.log(data);
            setCourseData(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [courseData]);

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login before checking your courses.</p>
          <button
            onClick={handleTakeToLogin}
            className="btn btn-primary btn-lg"
          >
            take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Welcome to {currentUser.user.username}'s page.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div>
          <h1>Welcome to {currentUser.user.username}'s page.</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length != 0 && (
        <div>
          <p>here's the data we got back from server.</p>
          {courseData.map((course) => (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Course Title : {course.title}</h5>
                <br />
                <div className="card-text">
                  <p>Course Description : {course.description}</p>
                  <p>Instructor : {course.instructor.username}</p>
                  <p>Total students : {course.students.length}</p>
                  <p>Price : {course.price}</p>
                  <div
                    courseId={course._id}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                  >
                    {/* edit button*/}
                    {currentUser.user.role == "instructor" && (
                      <button
                        onClick={() => {
                          handleUpdateCourseInfo(
                            course._id,
                            course.title,
                            course.description,
                            course.price
                          );
                        }}
                        type="button"
                        className="btn btn-dark"
                      >
                        Edit Course
                      </button>
                    )}
                    {/* { while a student click cancel course button} */}
                    {currentUser.user.role == "student" && (
                      <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={() => {
                          confirmCancelCourse(course._id);
                        }}
                        onCancel={() => {
                          console.log("cancel confirm");
                        }}
                        okText="yes"
                        cancelText="No"
                        type="button"
                        className="btn btn-dark"
                        courseId={course._id}
                      >
                        cancel Course
                      </Popconfirm>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {openModal == true && currentUser.user.role == "instructor" && (
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Title </Modal.Title>
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangeTitle}
              defaultValue={title}
            />
          </Modal.Header>

          <Modal.Body>
            Content
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangeDesciption}
              defaultValue={description}
            />
          </Modal.Body>
          <Modal.Body>
            Price
            <input
              name="title"
              type="text"
              className="form-control"
              id="exampleforTitle"
              onChange={handleChangePrice}
              defaultValue={price}
            />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={handleCancelChange} variant="secondary">
              Close
            </Button>
            <Button onClick={handleCommitChange} variant="primary">
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      )}

      {message && <div className="alert alert-danger">{message}</div>}
    </div>
  );
};

export default CourseComponent;
