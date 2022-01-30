import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const onPressRegister = () => {
    navigate("/register");
  };
  return (
    <main>
      <div className="container py-4">
        <div className="row align-items-md-stretch">
          <div className="col-md-6 ">
            <div
              className="h-100 p-5 text-white bg-dark rounded-3 "
              style={{ position: "relative" }}
            >
              <h2 style={{ color: "white" }}>As a student</h2>
              <p>
                Students can register in courses they like. This website is for
                practice purpose only, so please do not provide any personal
                information, such as credit card numbers.
              </p>
              <button
                onClick={onPressRegister}
                className="btn btn-outline-light"
                type="button"
                style={{ position: "absolute", bottom: "20px" }}
              >
                Register Now
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="h-100 p-5 bg-light border rounded-3"
              style={{ position: "relative" }}
            >
              <h2>As an Instructor</h2>
              <p>
                You can become an instructor by registering as one, and start
                making online courses. This website is for practice purpose
                only, so please do not provide any personal information, such as
                credit card numbers.
              </p>
              <button
                onClick={onprogress}
                className="btn btn-outline-secondary"
                type="button"
                style={{ position: "absolute", bottom: "20px" }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; 2022 Chen Bing Nan
        </footer>
      </div>
    </main>
  );
};

export default HomeComponent;
