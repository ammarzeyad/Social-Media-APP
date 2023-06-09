import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthActions";

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(true)
  console.log(loading)
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: ""
  })
  const [confirmPass, setConfirmPass] = useState(true)
  const handlChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);

    }
    else {
      dispatch(logIn(data))
    }
  }

  const resetForm = () => {
    setConfirmPass(true)
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: ""
    })
  }
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log in"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handlChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handlChange}
              />
            </div>
          )}


          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handlChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handlChange}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handlChange}
                value={data.confirmpass}
              />
            )}

          </div>
          <span style={{
            display: confirmPass ? "none" : "block",
            color: 'red',
            fontSize: '12px',
            alignSelf: 'flex-end',
            marginRight: '5px'
          }}>
            * Confirm Password Isn't Same
          </span>
          <div>
            <span style={{ fontSize: '12px', cursor: "pointer" }}
              onClick={() => { 
                setIsSignUp((prev) => !prev); 
                resetForm() 
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Dont Have Account? Sign Up"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "Signup" : "Log in"}</button>
        </form>
      </div>

    </div>
  );
};


export default Auth;