import { useEffect, useState, useId } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import QuestionCard from "../cards/QuestionCard";
import AddQuestion from "./AddQuestion";

import { SetId } from "../../actions";
export default function QuestionPanel() {
  const dispatch = useDispatch();
  let ClassAlert = useSelector((state) => state.customAlert);
  let QuizId1 = useSelector((state) => state.selectedtId);

  const id1 = useId();

  const [Questions, SetQuestions] = useState([]);
  const [Basic, SetBasic] = useState(undefined);
  const [Title, SetTile] = useState("none");
  const [QuizId, SetQuiz] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (QuizId1.state != null && QuizId1.state != "[object Object]") {
      SetQuiz(QuizId1.state);
      GetQuestions();
    } else {
      SetBasic(undefined);
      setLoading(true);
    }
  }, [ClassAlert, QuizId1]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function GetQuestions() {
    let data;

    await axios
      .get(process.env.REACT_APP_BASE_URL + QuizId1.state)
      .then((resp) => {
        data = resp.data;
      })
      .catch((error) => {});
    SetBasic(data);
    SetTile(data.title);
    SetQuestions(data.questions);
    setLoading(false);
  }

  function MoveUp(index) {
    if (Questions.length <= 1) {
      alert("Cannot Move.Reached End");
      return;
    }
    setLoading(true);
    axios
      .get(process.env.REACT_APP_BASE_URL + QuizId1.state)
      .then((resp) => {
        let arr = resp.data.questions;

        let temp = arr[index];

        arr[index] = arr[index - 1];

        arr[index - 1] = temp;

        axios
          .patch(process.env.REACT_APP_BASE_URL + QuizId1.state, {
            questions: arr,
          })
          .then((resp) => {
            dispatch(SetId(QuizId1.state));
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }

  function MoveDown(index) {
    if (Questions.length <= 1) {
      alert("Cannot Move.Reached End");
      return;
    }
    setLoading(true);
    axios
      .get(process.env.REACT_APP_BASE_URL + QuizId1.state)
      .then((resp) => {
        let arr = resp.data.questions;

        let temp = arr[index];

        arr[index] = arr[index + 1];

        arr[index + 1] = temp;

        axios
          .patch(process.env.REACT_APP_BASE_URL + QuizId1.state, {
            questions: arr,
          })
          .then((resp) => {
            dispatch(SetId(QuizId1.state));
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }

  return (
    <div className="QuestionPanel">
      {Basic == undefined ? (
        <div className="QuestionPanel__Header">Please Select A Quiz</div>
      ) : (
        <div className="QuestionPanel__Header">
          <div>Title : {Basic.title}</div>
          <div>Description : {Basic.description}</div>
          <div>Pass Percentage : {Basic.percentage}</div>

          <div>
            <button
              onClick={() => {
                window.open(
                  process.env.REACT_APP_BASE_URL2 + "user/" + Basic.id
                );
              }}
            >
              Share/Attempt
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div class="loader"></div>
      ) : (
        <div>
          {Questions.length <= 0 ? (
            <div>No Questions added. </div>
          ) : (
            Questions.map((element, index) => {
              if (index == 0) {
                return (
                  <div
                    key={`${element.Question}${id1}`}
                    className="QuestionPanel__Items"
                  >
                    <div className="QuestionPanel__Items_Arrows">
                      <div
                        onClick={() => {
                          MoveDown(index);
                        }}
                        className="QuestionPanel__Items_Arrows_Arrow"
                      >
                        <i className="fa-solid fa-arrow-down"></i>
                      </div>
                    </div>
                    <QuestionCard Question={element} index={index} />
                  </div>
                );
              } else if (index + 1 == Questions.length) {
                return (
                  <div
                    key={`${element.Question}${id1}`}
                    className="QuestionPanel__Items"
                  >
                    <div className="QuestionPanel__Items_Arrows">
                      <div
                        onClick={() => {
                          MoveUp(index);
                        }}
                        className="QuestionPanel__Items_Arrows_Arrow"
                      >
                        <i className="fa-solid fa-arrow-up"></i>
                      </div>
                    </div>
                    <QuestionCard Question={element} index={index} />
                  </div>
                );
              } else {
                return (
                  <div
                    key={`${element.Question}${id1}`}
                    className="QuestionPanel__Items"
                  >
                    <div className="QuestionPanel__Items_Arrows">
                      <div
                        onClick={() => {
                          MoveUp(index);
                        }}
                        className="QuestionPanel__Items_Arrows_Arrow"
                      >
                        <i
                          onClick={() => {
                            MoveUp(index);
                          }}
                          className="fa-solid fa-arrow-up"
                        ></i>
                      </div>

                      <div className="QuestionPanel__Items_Arrows_Arrow">
                        <i
                          onClick={() => {
                            MoveDown(index);
                          }}
                          className="fa-solid fa-arrow-down"
                        ></i>
                      </div>
                    </div>
                    <QuestionCard Question={element} index={index} />
                  </div>
                );
              }
            })
          )}
        </div>
      )}

      <AddQuestion title={Title} id={QuizId1.state} />
    </div>
  );
}
