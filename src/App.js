import { useEffect } from "react";
import "./App.css";
import { useUserContext } from "./Context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import axios from "axios";
import SharedLayout from "./Shared/SharedLayout";
import Question from "./Pages/Question/Question";
import Answer from "./Pages/Answer/Answer";
import Footer from "./Pages/Footer/Footer";

function App() {
  const [userData, setUserData] = useUserContext();

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (!token) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      // if auth exist then verify token and get user info
      const userRes = await axios.get("http://localhost:4000/api/users", {
        headers: { "x-auth-token": token },
      });

      //set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };

  // const logout = () => {
  //   //set global state to undefined will logout the user
  //   setUserData({
  //     token: undefined,
  //     user: undefined,
  //   });

  //   //resetting localStorage
  //   localStorage.setItem("auth-token", "");
  // };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              path="/signup"
              element={
                <>
                  <Signup />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route
              path="/question"
              element={
                <>
                  <Question />
                </>
              }
            />
            <Route
              path="/answer"
              element={
                <>
                  <Answer />
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
