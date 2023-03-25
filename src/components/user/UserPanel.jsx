import { useParams } from "react-router-dom";
import { useEffect, useState, useId } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { SetAnswer } from "../../actions";
import { ResultClass } from "../../classes/ResultClass";

export default function UserPanel() {
  const [Questions, SetQuestions] = useState([]);
  const [Basics, SetBasics] = useState([]);
  const [Limit, SetLimit] = useState(1);
  const [Value, SetValue] = useState("");
  let SelectedAnswers = useSelector((state) => state.setAnswer);
  const [End, SetEnd] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const id1 = useId();

  let { id } = useParams();

  useEffect(() => {
    GetQuestion();
  }, []);

  async function GetQuestion() {
    let data;

    await axios
      .get(process.env.REACT_APP_BASE_URL + id)
      .then((resp) => {
        data = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });

    SetBasics(data);
    SetQuestions(data.questions);
    setLoading(false);
  }

  async function GetResult() {
    let data;

    await axios
      .get(process.env.REACT_APP_BASE_URL + id)
      .then((resp) => {
        data = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });

    let correct = 0;

    data.questions.map((element, index) => {
      let orginal = element.Answers.sort().toString();
      let given;
      if (typeof SelectedAnswers.answer[index] == typeof []) {
        given = SelectedAnswers.answer[index].sort().toString();
      } else {
        given = SelectedAnswers.answer[index].toString();
      }

      if (orginal == given) {
        correct++;
      }
    });

    let FinalCorrect = correct;
    let Percentage = (FinalCorrect / data.questions.length) * 100;
    let PassPercentage = data.percentage;

    let status;
    if (Percentage >= PassPercentage) {
      status = true;
    } else {
      status = false;
    }
    let Result = new ResultClass(
      status,
      FinalCorrect,
      data.questions.length,
      Percentage
    );
    Result = JSON.stringify(Result);
    console.log(`Result is ${Result.result}`);
    localStorage.setItem(data.id, Result);
    window.open(process.env.REACT_APP_BASE_URL2 + "result/" + data.id);
  }
  return (
    <div className="UserPanel">
      <div className="UserPanel__Header">
        <i className="fa-solid fa-robot"></i>
        SparrowBot
      </div>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="AddQuestion__Chat_Main">
            <i className="fa-solid fa-robot"></i>{" "}
            <div> Hello I am SparrowBot. Lets start the quiz?</div>
          </div>
          <div className="AddQuestion__Chat_Main">
            <i className="fa-solid fa-robot"></i>{" "}
            <div>
              {" "}
              Here are the details about the quiz.<br></br>
              <br></br>
              Title:{Basics.title}
              <br></br>
              Description:{Basics.description}
              <br></br>
              Pass Percentage: {Basics.percentage}%<br></br>
              These are the rules:<br></br>
              <li>There is no negative mark</li>
              <li>
                After choosing the answer click on button to goto next question.
              </li>
              <li>You cannot go to the previous question</li>
              <li>All the best lets begin the quiz.</li>
            </div>
          </div>

          {Questions.slice(Limit - 1, Limit).map((element) => {
            if (element.Type == "DropDown") {
              return (
                <div key={id1 + element.Question} className="UserPanel__Answer">
                  {element.Question}
                  <div className="UserPanel__Answer_Option">
                    <select
                      onChange={(e) => {
                        SetValue(parseInt(e.target.value) + 1);
                      }}
                    >
                      <option value="">Select</option>
                      {element.Options.map((opt, index) => {
                        return (
                          <option
                            key={id1 + element.Question + index}
                            value={parseInt(index)}
                          >
                            {opt}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              );
            } else if (element.Type == "Radio") {
              return (
                <div
                  key={id1 + element.Question + "kk"}
                  className="UserPanel__Answer"
                >
                  {element.Question}

                  <div className="UserPanel__Answer_Option">
                    <input
                      defaultChecked
                      className="UserPanel__Answer_Option_Radio"
                      onClick={(e) => {
                        SetValue(parseInt(e.target.value) + 1);
                      }}
                      type="radio"
                      name="radio"
                      value={""}
                    ></input>
                    Select<br></br>
                    {element.Options.map((opt, index) => {
                      return (
                        <div key={id1 + index + "stds"}>
                          <input
                            className="UserPanel__Answer_Option_Radio"
                            onClick={(e) => {
                              SetValue(parseInt(e.target.value) + 1);
                            }}
                            type="radio"
                            name="radio"
                            value={parseInt(index)}
                          ></input>
                          {opt}
                          <br></br>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={id1 + element.Question} className="UserPanel__Answer">
                  {element.Question}

                  <div className="UserPanel__Answer_Option">
                    {element.Options.map((opt, index) => {
                      return (
                        <div key={id1 + element.Question + index}>
                          <input
                            key={id1 + element.Question + index}
                            onClick={(e) => {
                              if (
                                Value.includes(parseInt(e.target.value) + 1)
                              ) {
                                SetValue((arr) =>
                                  arr.filter(
                                    (element) =>
                                      element != parseInt(e.target.value) + 1
                                  )
                                );
                              } else {
                                SetValue((arr) => [
                                  ...arr,
                                  parseInt(e.target.value) + 1,
                                ]);
                              }
                            }}
                            type="checkbox"
                            name="radio"
                            value={parseInt(index)}
                          ></input>
                          {opt}
                          <br></br>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}

          {!End ? (
            <button
              onClick={() => {
                if (Value == "") {
                  alert("Please give a answer");
                } else {
                  dispatch(SetAnswer(Value));
                  SetValue([]);
                  SetLimit(Limit + 1);
                  if (Limit >= Questions.length) {
                    SetEnd(true);
                  }
                }
              }}
            >
              Save & Goto Next Question
            </button>
          ) : (
            <div className="UserPanel__End">
              <div className="AddQuestion__Chat_Main">
                <i className="fa-solid fa-robot"></i>{" "}
                <div>
                  {" "}
                  Great you have completed the quiz. Lets check the result.
                </div>
              </div>
              <button
                onClick={() => {
                  GetResult();
                }}
              >
                Get Result
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
