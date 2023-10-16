import React, { useState } from "react";
import "./Login.css";
import { useUserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Constant/axios";

function Login() {
  const [userData, setUserData] = useUserContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const loginRes = await axios.post("/users/login", {
        email: form.email,
        password: form.password,
      });

     
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

     
      localStorage.setItem("auth-token", loginRes.data.token);

    
      navigate("/");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login">
      <div className="login_container">
        <div className="login__top">
          <h3 className="login__title">Login to your account</h3>
          <p>
            Don’t have an account?
            <Link className="login__link clear_link" to="/signup">
              Create a new account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
          />
          <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          <Link className="forgot__link" to="/">
            Forgot password?
          </Link>
          <button>Login</button>
        </form>
        <div className="login__bottom--link">
          <Link className="login__link link-style clear_link" to="/signup">
            Create a new account
          </Link>
        </div>
      </div>
      <div className="login__about">
        <p className="login__about--title">About</p>
        <div className="about__detail">
          <h1>Evangadi Networks Q&A</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <br />
            <br />
            Wheather you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
        <button className="btn">HOW IT WORKS</button>
      </div>
    </div>
  );
}

export default Login;
