import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const ProfileComponent = (props) => {
  let { currentUser, setCurrentUser } = props;

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>you must login first before getting your profile.</div>
      )}
      {currentUser && (
        <div>
          <h1>Welcome to Profile page.</h1>
          <header className="jumbotron">
            <h3>
              <strong>Account name : {currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>Token: {currentUser.token}</strong>
          </p>
          <p>
            <strong>Id: {currentUser.user._id}</strong>
          </p>
          <p>
            <strong>Email: {currentUser.user.email}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
