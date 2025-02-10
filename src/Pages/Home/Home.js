import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import "./Home.css";
import axios from "../../Constant/axios";
import Display from "../Display/Display";

function Home() {
  const [userData] = useUserContext();
  const [allQuestions, setAllQuestions] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/question/all`");
      // console.log(request)
      setAllQuestions(request.data.data);
      return request;
    }
    fetchData();
  }, []);
  // console.log(allQuestions);
  return (
    <div className="home">
      <div className="home__container">
        <div className="title__home">
          <h2>Welcome {userData.user?.display_name}</h2>
        </div>

        <div className="home__header">
          <Link to="/question">Ask Question</Link>
          <div className="home__search">
            <form>
              <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions"
              />
            </form>
          </div>
        </div>

        <div className="home__questions">
          <h2>Questions</h2>
          <div className="question_content">
            {allQuestions
              .filter((items) => {
                return search.toUpperCase() === ""
                  ? items
                  : items.question.toUpperCase().includes(search.toUpperCase());
              })
              .map((items) => (
                <Display
                  key={items.question_id}
                  data={items.question}
                  question_id={items.question_id}
                  user_id={items.user_id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
