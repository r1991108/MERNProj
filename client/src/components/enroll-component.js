import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course-service";

const EnrollComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);
  let [message, setMessage] = useState("");
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        console.log(data);
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEnroll = (e) => {
    // console.log(e.target.attributes.students.value);
    let students = e.target.attributes.students.value.split(",");
    console.log(students);
    let isEnrolled = students.some((student) => {
      return student == currentUser.user._id;
    });
    if (isEnrolled) {
      setMessage("You have already enrolled this course");
    } else {
      CourseService.enroll(e.target.id, currentUser.user._id)
        .then(() => {
          window.alert("Done Enrollment");
          navigate("/course");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      {message && (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}
      {!currentUser && (
        <div>
          <p>You must login first before searching for courses.</p>
          <button class="btn btn-primary btn-lg" onClick={handleTakeToLogin}>
            Take me to login page.
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "instructor" && (
        <div>
          <h1>Only students can enroll in courses.</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "student" && (
        <div className="search input-group mb-3">
          <input
            onChange={handleChangeInput}
            type="text"
            class="form-control"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      )}
      {currentUser && searchResult && searchResult.length != 0 && (
        <div>
          <p>Data we got back from API.</p>
          {searchResult.map((course) => (
            <div key={course._id} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price: {course.price}</p>
                <p>Student: {course.students.length}</p>
                <button
                  onClick={handleEnroll}
                  className="btn btn-primary"
                  id={course._id}
                  students={course.students}
                >
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
