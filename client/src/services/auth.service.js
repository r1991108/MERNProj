import axios from "axios";
// const API_URL = "http://localhost:8080/api/user";
const API_URL =
  `${window.location.protocol}//${window.location.hostname}` + ":8080/api/user";

class AuthService {
  login(email, password) {
    console.log(API_URL);
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password, role) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      role,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
