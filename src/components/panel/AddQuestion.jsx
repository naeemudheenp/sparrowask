import { QuestionClass } from "../../classes/QuestionClass";
import { useState, useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DisableAlert, SetId } from "../../actions";
import axios from "axios";

export default function AddQuestion(props) {
  let FinalQuestion = new QuestionClass();

  const dispatch = useDispatch();

  const [input, setInput] = useState();
  const [text, setText] = useState("");
  const [Visibility, setVisibility] = useState("");
  const [Bot, setBot] = useState("Bot_Hidden");

  const [Dynamic, setDynamic] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [Limit, setLimit] = useState(0);
  const [OptionLimit, setOption] = useState(0);
  const [FieldLimit, setField] = useState(0);
  const [StopLimit, setStop] = useState(0);
  const [Chat, setChat] = useState(0);

  const [Question, setQuestion] = useState("");
  const [Type, setType] = useState("");
  const [Answers, setAnswers] = useState([]);
  const [Correct, setCorrect] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const id1 = useId();

  let QuizId = useSelector((state) => state.selectedtId);

  useEffect(() => {}, [Visibility, QuizId.state]);

  function UpdateChat() {
    if (Chat == 1) {
      if (input == "STOP") {
        return;
      } else {
        setAnswers((arr) => [...arr, input]);
      }
    } else {
      setQuestion(input);
      setChat(1);
      setLimit(1);
      setStop(1);

      setVisibility("AddQuestion__Chat_Replay");
    }
  }

  function SetterType(type) {
    setType(type);
    setOption(1);
    setStop(1);
  }

  function SaveData() {
    if ((Answers.length <= 0) | (Correct.length <= 0) | (Type == "")) {
      alert("Please Fill All Data.");

      return;
    }

    setLoading(true);
    axios
      .get(process.env.REACT_APP_BASE_URL + props.id)
      .then((resp) => {
        FinalQuestion.Question = Question;
        FinalQuestion.Type = Type;
        FinalQuestion.Answers = Correct;
        FinalQuestion.Options = Answers;

        resp.data.questions.push(FinalQuestion);
        axios
          .patch(process.env.REACT_APP_BASE_URL + props.id, {
            questions: resp.data.questions,
          })
          .then((resp) => {
            setLoading(false);
            setBot("Bot_Hidden");
            setAnswers([]);
            setCorrect([]);
            setQuestion("");
            setLimit(0);
            setOption(0);
            setField(0);
            setChat(0);
            setVisibility("");
            setStop(0);

            dispatch(SetId(props.id));
            props.id = 0;

            const timer = setTimeout(() => {
              dispatch(DisableAlert());
            }, 1000);
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  }
  return (
    <div className="AddQuestion">
      <div className={Bot}>
        <div className="AddQuestion__Chat__Header">
          <div className="AddQuestion__Chat__Header_Panel">
            <div>
              <i className="fa-solid fa-robot"></i>
              SparrowBot
            </div>
            <div
              onClick={() => {
                setBot("Bot_Hidden");
                setAnswers([]);
                setCorrect([]);
                setQuestion("");
                setLimit(0);
                setOption(0);
                setField(0);
                setChat(0);
                setVisibility("");
                setStop(0);
              }}
              className="AddQuestion__Chat__Header_Panel_Close"
            >
              <i class="fa-solid fa-minus"></i>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div class="loader"></div>
        ) : (
          <div className="AddQuestion__Chat">
            <div className="AddQuestion__Chat_Main">
              <i
                style={{ visibility: "hidden" }}
                className="fa-solid fa-robot"
              ></i>{" "}
              <div>
                {" "}
                Hey ! I am SparrowBot. Selected quiz is {props.title}I will help
                you in building questions. :)
              </div>
            </div>

            <div className="AddQuestion__Chat_Main">
              <i className="fa-solid fa-robot"></i>{" "}
              <div> What is your question ?</div>
            </div>

            <div className={Visibility}>
              <div> {Question}</div>
            </div>

            {Dynamic.slice(0, Limit).map(() => {
              return (
                <>
                  <div
                    key={id1 + Limit + "td"}
                    className="AddQuestion__Chat_Main"
                  >
                    <i className="fa-solid fa-robot"></i>{" "}
                    <div> Please Choose Question Type ?</div>
                  </div>

                  <div
                    key={id1 + Limit + "td123"}
                    className="AddQuestion__Chat_Types"
                  >
                    <div
                      onClick={() => {
                        SetterType("DropDown");
                      }}
                      className="AddQuestion__Chat_Types_Type"
                    >
                      DropDown
                    </div>

                    <div
                      onClick={() => {
                        SetterType("CheckBox");
                      }}
                      className="AddQuestion__Chat_Types_Type"
                    >
                      CheckBox
                    </div>

                    <div
                      onClick={() => {
                        SetterType("Radio");
                      }}
                      className="AddQuestion__Chat_Types_Type"
                    >
                      Radio
                    </div>
                  </div>
                </>
              );
            })}

            {Dynamic.slice(0, OptionLimit).map(() => {
              return (
                <>
                  <div key={id1 + Limit} className="AddQuestion__Chat_Main">
                    <i className="fa-solid fa-robot"></i>{" "}
                    <div>
                      {" "}
                      Enter Options and Mark Options Which Are Correct. Press
                      STOP When finished.
                    </div>
                  </div>
                </>
              );
            })}

            {Dynamic.slice(0, FieldLimit).map(() => {
              return (
                <>
                  <div key={id1 + FieldLimit} className={Visibility}>
                    <div> {Question}</div>
                  </div>
                </>
              );
            })}

            {Answers.map((elements, index) => {
              return Type == "CheckBox" ? (
                <div
                  key={id1 + index + "ch"}
                  className="AddQuestion__Chat_Replay"
                >
                  <input
                    name="ss"
                    type="checkbox"
                    value={index + 1}
                    onChange={(e) => {
                      let temp = [];
                      temp.push(e.target.value);
                      setCorrect((arr) => [...arr, e.target.value]);
                    }}
                  ></input>
                  Option {index + 1} : {elements}
                </div>
              ) : (
                <div
                  key={id1 + index + "mn"}
                  className="AddQuestion__Chat_Replay"
                >
                  <input
                    name="ss"
                    type="radio"
                    value={index + 1}
                    onChange={(e) => {
                      let temp = [];
                      temp.push(e.target.value);
                      setCorrect(temp);
                    }}
                  ></input>
                  Option {index + 1} : {elements}
                </div>
              );
            })}
          </div>
        )}

        <div className="AddQuestion__Chat_Input">
          {Dynamic.slice(0, StopLimit).map(() => {
            return (
              <button
                key={id1 + StopLimit + "ch"}
                className="AddQuestion__Chat_Stop"
                onClick={() => {
                  SaveData();
                }}
              >
                STOP & SAVE
              </button>
            );
          })}
          <div>
            <input
              value={text}
              onChange={(e) => {
                setInput(e.target.value);
                setText(e.target.value);
              }}
              type="text"
            ></input>
            <button
              onClick={(e) => {
                if (text == "") {
                  alert("TextField Empty. Please Input Data.");
                } else {
                  e.target.value = "";
                  UpdateChat();
                  setText("");
                  setInput("");
                }
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          if (QuizId.state == null || QuizId.state == "[object Object]") {
            alert("Please select a quiz");
          } else {
            setBot("");
          }
        }}
        className="AddQuestion__Float"
      >
        +
      </div>
    </div>
  );
}
