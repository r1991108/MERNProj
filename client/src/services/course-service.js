import axios from "axios";
// const API_URL = "http://localhost:8080/api/courses";
const API_URL =
  `${window.location.protocol}//${window.location.hostname}` +
  ":8080/api/courses";
class CourseService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    console.log(token);
    return axios.post(
      API_URL,
      { title, description, price },
      { headers: { Authorization: token } }
    );
  }

  getEnrolledCourses(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/student/" + _id, {
      headers: { Authorization: token },
    });
  }

  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // console.log(token);
    // console.log(_id);
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }

  enroll(_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    console.log(_id, user_id, API_URL + "/enroll/" + _id, token);
    return axios.post(
      API_URL + "/enroll/" + _id,
      { user_id },
      { headers: { Authorization: token } }
    );
  }

  editClassInfo(courseId, title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    console.log(
      courseId,
      title,
      description,
      price,
      API_URL + "/" + courseId,
      token
    );
    return axios.patch(
      API_URL + "/" + courseId,
      { title, description, price },
      { headers: { Authorization: token } }
    );
  }
}

export default new CourseService();
