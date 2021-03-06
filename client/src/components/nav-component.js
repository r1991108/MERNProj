import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const NavComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    window.alert("logout successfully, now redirecting to homepage");
    setCurrentUser(null);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top bg-dark">
      <div className="container-fluid">
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            {!currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link onClick={handleLogout} className="nav-link" to="">
                  Logout
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/course">
                  Course
                </Link>
              </li>
            )}

            {currentUser && currentUser.user.role == "instructor" && (
              <li className="nav-item">
                <Link className="nav-link" to="/postCourse">
                  Post Course
                </Link>
              </li>
            )}
            {currentUser && currentUser.user.role == "student" && (
              <li className="nav-item">
                <Link className="nav-link" to="/enroll">
                  Enroll
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavComponent;
