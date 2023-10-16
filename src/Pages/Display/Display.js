import axios from "../../Constant/axios";
import "./Display.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useEffect, useState } from "react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";

function Display({ data, question_id, user_id, answer_view }) {
  const [name, setName] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("/users/id", {
        id: user_id,
      });
      // console.log(request);
      setName(request.data.data.user_name);
      return request;
    }
    fetchData();
  }, []);

  const openAnswersPage = (id) => {
    navigate({
      pathname: "/answer",
      search: createSearchParams({
        id: id,
      }).toString(),
    });
  };

  return (
    <div
      className="display flex align-center justify-space-between transition"
      onClick={() => openAnswersPage(question_id)}>
      <div className="display__container ">
        <div className="avatar">
          <img
            src="https://img1.pnghut.com/2/7/9/tJjuHbxA2H/symbol-text-royalty-free-brand-question-mark.jpg"
            alt="user avatar"
          />
          <h4>{name}</h4>
        </div>
        <div className="question">
          {!answer_view ? <h3>{data}</h3> : <p>{data}</p>}
        </div>
      </div>
      {!answer_view ? (
        <Link className="right__arrow">
          <KeyboardDoubleArrowRightIcon />
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default Display;
