// import React, { useState } from "react";
// import { useUserContext } from "../../Context/UserContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "../../Constant/axios";
// import "./Signup.css";

// function SignUp() {
//   const [form, setForm] = useState({});
//   const navigate = useNavigate();

//   //importing global state from context
//   const [userData, setUserData] = useUserContext();
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/users", form);

//       const loginRes = await axios.post(
//         "https://forum-backend-izp5.onrender.com/api/users/register",
//         {
//           email: form.email,
//           password: form.password,
//         }
//       );

//       setUserData({
//         token: loginRes.data.token,
//         user: loginRes.data.user,
//       });

//       localStorage.setItem("auth-token", loginRes.data.token);

//       navigate("/");
//     } catch (err) {
//       // console.log("problem ==>", err.response.data.msg);
//       alert(err.response.data.msg);
//     }
//   };
//   return (
//     <div className="signup">
//       <div className="signup_container--wrapper">
//         <div className="signup_container animation">
//           <div className="signup__top">
//             <h3 className="signup__title">Join the network</h3>
//             <p>
//               Already have an account?
//               <Link className="login__link clear_link" to="/login">
//                 Sign in
//               </Link>
//             </p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="email"
//               onChange={handleChange}
//               placeholder="Email Address"
//             />
//             <br />
//             <div className="signup__name">
//               <input
//                 type="text"
//                 name="firstName"
//                 onChange={handleChange}
//                 placeholder="First Name"
//               />
//               <br />
//               <input
//                 type="text"
//                 name="lastName"
//                 onChange={handleChange}
//                 placeholder="Last Name"
//               />
//             </div>
//             <br />
//             <input
//               type="text"
//               name="userName"
//               onChange={handleChange}
//               placeholder="Username"
//             />
//             <br />
//             <input
//               type="password"
//               name="password"
//               onChange={handleChange}
//               placeholder="Password"
//             />
//             <br />
//             <p>
//               I agree to the <Link to="/">privacy policy</Link> and{" "}
//               <Link to="/"> terms of service</Link>.
//             </p>
//             <br />
//             <button className="btn">Agree and Join</button>
//           </form>
//           <div className="center mt-1">
//             {/* <Link className="link-3 col-2 center " to="/login"> 
//               Already have an account?
//              </Link> */}
//           </div>
//         </div>
//       </div>
//       <div className="signup__about">
//         <p className="signup__about--title">About</p>
//         <div className="about__detail">
//           <h1>Evangadi Networks Q&A</h1>
//           <p>
//             No matter what stage of life you are in, wheather you’re just
//             starting elementary school or being promoted to CEO of a Fortune 500
//             company, you have much to offer to those who are trying to follow in
//             your footsteps.
//             <br />
//             <br />
//             Wheather you are willing to share your knowledge or you are just
//             looking to meet mentors of your own, please start by joining the
//             network here.
//           </p>
//         </div>
//         <button className="border-none col-5">HOW IT WORKS</button>
//       </div>
//     </div>
//   );
// }

// export default SignUp;



import React, { useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Constant/axios";
import "./Signup.css";

function SignUp() {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const [userData, setUserData] = useUserContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ **Send user registration request**
      await axios.post(
        "https://forum-backend-izp5.onrender.com/api/users/register",
        form
      );

      // 2️⃣ **After successful registration, send login request**
      const loginRes = await axios.post(
        "https://forum-backend-izp5.onrender.com/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // 3️⃣ **Update global state with user data**
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      // 4️⃣ **Store authentication token in localStorage**
      localStorage.setItem("auth-token", loginRes.data.token);

      // 5️⃣ **Redirect to homepage**
      navigate("/");
    } catch (err) {
      console.error("Signup Error:", err.response?.data.msg || err.message);
      alert(err.response?.data.msg || "An error occurred, please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="signup_container--wrapper">
        <div className="signup_container animation">
          <div className="signup__top">
            <h3 className="signup__title">Join the network</h3>
            <p>
              Already have an account?{" "}
              <Link className="login__link clear_link" to="/login">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="Email Address"
              required
            />
            <br />
            <div className="signup__name">
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={form.firstName}
                placeholder="First Name"
                required
              />
              <br />
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={form.lastName}
                placeholder="Last Name"
                required
              />
            </div>
            <br />
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              value={form.userName}
              placeholder="Username"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
              placeholder="Password"
              required
            />
            <br />
            <p>
              I agree to the <Link to="/">privacy policy</Link> and{" "}
              <Link to="/"> terms of service</Link>.
            </p>
            <br />
            <button className="btn">Agree and Join</button>
          </form>
        </div>
      </div>

      <div className="signup__about">
        <p className="signup__about--title">About</p>
        <div className="about__detail">
          <h1>Evangadi Networks Q&A</h1>
          <p>
            No matter what stage of life you are in, whether you’re just
            starting elementary school or being promoted to CEO of a Fortune 500
            company, you have much to offer to those who are trying to follow in
            your footsteps.
            <br />
            <br />
            Whether you are willing to share your knowledge or you are just
            looking to meet mentors of your own, please start by joining the
            network here.
          </p>
        </div>
        <button className="border-none col-5">HOW IT WORKS</button>
      </div>
    </div>
  );
}

export default SignUp;
