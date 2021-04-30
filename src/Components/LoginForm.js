import React, { useState } from "react";
import {Link} from 'react-router-dom';

const LoginForm = () => {
  const loginObj = {
    email: "",
    password: "",
  };
  // getdata state
  const [login, setLogin] = useState(loginObj);
  // error data state
  const [err, setErr] = useState(loginObj);
  let loginCheck = (e) => {
    const { value, name } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    checkError();
  };

  // checkError
  let emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkError = () => {
    let errorObject = {};
    if (login.email === "") {
      errorObject.emailErr = "***Please Enter email";
    } else if (!emailValidator.test(login.email)) {
      errorObject.emailErr = "***Please Enter an valid email";
    } else {
      errorObject.emailErr = "";
    }
    if (login.password === "") {
      errorObject.passwordErr = "***Please Enter password";
    } else if (login.password.length < 8) {
      errorObject.passwordErr = "***Password must have 8 character";
    } else {
      errorObject.passwordErr = "";
    }

    setErr(errorObject);
  };

  let checkLogin = (e) => {
    e.preventDefault();
    if (
      !err.email == "" ||
      !err.password == "" ||
      login.email == "" ||
      login.password.length < 8 ||
      !emailValidator.test(login.email)
    ) {
      alert("Please Enter all filed properly");
      console.log("ERR", err);
      checkError();
    } else {
      setErr("");
      fetch("http://localhost:3111/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(login),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLogin(loginObj);
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row loginForm">
          <div className="col-md-6 p-5 two">
            <h2 className="font-weight-bold text-center">Login</h2>
            <form className="w-100">
              {/* email */}
              <div className="form-group">
                <label htmlFor="name">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={loginCheck}
                  autoComplete="off"
                  value={login.email}
                />
                <small className="text-danger">{err.emailErr}</small>
              </div>
              {/* password */}
              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={loginCheck}
                  autoComplete="off"
                  value={login.password}
                />
                <small className="text-danger">{err.passwordErr}</small>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control"
                  value="Login In"
                  className="btn btn-primary btn-block"
                  onClick={checkLogin}
                />
              </div>
              <div className="form-group text-center">
                <small className="text-muted">
                  Signup for new user{" "}
                  <Link to="/">
                    <span className="text-primary button">Click here</span>
                  </Link>
                </small>
              </div>
            </form>
          </div>
          <div className="col-md-6 bg-primary text-white one p-5">
            <h2 className="py-4">WELCOME TO LOGIN</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, est
              nam explicabo magnam iusto sint consectetur? Illum sint delectus
              dolores, voluptatum aliquam, atque saepe et inventore voluptas
              totam unde. Eligendi? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Odio, tempore fuga! Accusantium delectus, dicta
              sint quibusdam nisi dolorum aperiam consequuntur adipisci aut
              dolores minima asperiores ab tenetur sunt nostrum aspernatur ex
              iste. Voluptas provident ad impedit sint numquam architecto hic!
            </p>
            <button className="btn btn-outline-light my-2">Know More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
