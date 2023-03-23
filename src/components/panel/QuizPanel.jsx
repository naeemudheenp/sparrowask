import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import QuizCard from "../cards/QuizCard";
import { useSelector } from "react-redux";
import AddQuiz from "./AddQuiz";

export default function QuizPanel() {
  const [Quizes, SetQuizes] = useState([]);
  const [IsLoading,SetLoading] = useState(true)

  let ClassAlert = useSelector((state) => state.customAlert);

  useEffect(() => {
    GetQuizes();
  }, [ClassAlert]);

  async function GetQuizes() {
    let data;

    await axios
      .get(process.env.REACT_APP_BASE_URL)
      .then((resp) => {
        data = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });

    SetQuizes(data);
    SetLoading(false)
  }

  return (
    IsLoading ? (
      <div className="QuizPanel" >
        <div class="loader"></div>
      </div>
    ):(
      <div className="QuizPanel">
      <AddQuiz />
      {Quizes?.length > 0 ? (
        Quizes.map((element) => {
          return <QuizCard key={element.id} Quiz={element} />;
        })
      ) : (
        <div className="QuizPanel__Error">Quiz Empty.Please Add.</div>
      )}
    </div>
    )
  );
}
