import React from "react";
import { GoogleCircleFilled } from "@ant-design/icons";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";

const Login = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const googleRedirect = new firebase.auth.GoogleAuthProvider();

  return (
    <>
      <div id="login-page">
        <div id="login-card">
          <h2>Hello, Welcome to Chat App</h2>
          <div
            className="login-button google"
            onClick={() => auth.signInWithRedirect(googleRedirect)}
          >
            <GoogleCircleFilled
              style={{
                fontSize: "22px",
                position: "relative",
              }}
            />{" "}
            Sign in With Google
          </div>
        </div>
      </div>
      <footer className="footer">
        &copy; Copyright {currentYear} @Dipesh Patil
      </footer>
    </>
  );
};

export default Login;
