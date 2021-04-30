import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const LoginForm = () => {
  const emptyObj = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [inputs, SetInputs] = useState(emptyObj);
  const [error, setError] = useState(emptyObj);
  let getInputs = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      SetInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "password") {
      SetInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "name") {
      SetInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "phone") {
      SetInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    showErr();
  };

  const showErr = () => {
    let errorObj = {};
    // email
    if (inputs.email === "") {
      errorObj.emailErr = "**Please Enter Email";
    } else if (!emailValidator.test(inputs.email)) {
      errorObj.emailErr = "**Please Enter Valid Email";
    } else {
      errorObj.emailErr = "";
    }
    // password
    if (inputs.password === "") {
      errorObj.passErr = "**Plase Enter Password";
    } else if (inputs.password.length < 8) {
      errorObj.passErr = "**Password must be greater then 8 character";
    } else {
      errorObj.passErr = "";
    }
    // name
    if (inputs.name === "") {
      errorObj.nameErr = "***Please Enter Username";
    } else if (inputs.name.length < 4) {
      errorObj.name = "***Username must be greater then 4 character";
    } else {
      errorObj.nameErr = "";
    }
    // phone
    if (inputs.phone === "") {
      errorObj.phoneErr = "***Please Enter Phone";
    } else if (!inputs.phone.length == 10) {
      errorObj.phoneErr = "***Phone must have 10 digit";
    } else {
      errorObj.phoneErr = "";
    }
    setError(errorObj);
  };

  let checkSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.email === "" ||
      inputs.password === "" ||
      !emailValidator.test(inputs.email) ||
      inputs.password.length < 8 ||
      inputs.name === "" ||
      inputs.phone === "" ||
      inputs.name.length < 4 ||
      inputs.phone.length != 10
    ) {
      showErr();
    } else {
      setError("");
      console.log("Congress:  ", inputs);
      alert("running...");
      axios
        .post("http://localhost:3111/api/register", {
          name: inputs.name,
          email: inputs.email,
          phone: inputs.phone,
          password: inputs.password,
        })
        .then((response) => {
          console.log("response: ", response);
          SetInputs(emptyObj);
        })
        .catch((err) => {
          alert("Error" + err.message);
          SetInputs(emptyObj);
        });
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row loginForm">
          <div className="col-md-6 bg-primary text-white one p-5">
            <h2 className="py-4">WELCOME TO SINGUP</h2>
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
          <div className="col-md-6 p-5 two">
            <h2 className="font-weight-bold text-center">Signup</h2>
            <form className="w-100">
              {/* username */}
              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter Username"
                  onChange={getInputs}
                  autoComplete="off"
                  value={inputs.name}
                />
                <small className="text-danger">{error.nameErr}</small>
              </div>
              {/* email */}
              <div className="form-group">
                <label htmlFor="name">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={getInputs}
                  autoComplete="off"
                  value={inputs.email}
                />
                <small className="text-danger">{error.emailErr}</small>
              </div>
              {/* phone */}
              <div className="form-group">
                <label htmlFor="email">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  placeholder="Enter Phone"
                  onChange={getInputs}
                  autoComplete="off"
                  value={inputs.phone}
                />
                <small className="text-danger">{error.phoneErr}</small>
              </div>
              {/* password */}
              <div className="form-group">
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={getInputs}
                  autoComplete="off"
                  value={inputs.password}
                />
                <small className="text-danger">{error.passErr}</small>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="form-control"
                  value="Sign Up"
                  className="btn btn-primary btn-block"
                  onClick={checkSubmit}
                />
              </div>
              <div className="form-group text-center">
                <small className="text-muted">
                  Login for Existing user{" "}
                  <Link to="/Login">
                    <span className="button text-primary">Click here!</span>
                  </Link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
