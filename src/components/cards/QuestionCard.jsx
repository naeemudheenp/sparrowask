import { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetId } from "../../actions";
import axios from "axios";
export default function QuestionCard(props) {
  const dispatch = useDispatch();
  const id1 = useId();
  const id2 = useId();
  const [isLoading, setLoading] = useState(false);

  let QuizId = useSelector((state) => state.selectedtId);

  function DeleteQuestion() {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_BASE_URL + QuizId.state)
      .then((resp) => {
        let arr = resp.data.questions;

        arr.splice(props.index, 1);

        axios
          .patch(process.env.REACT_APP_BASE_URL + QuizId.state, {
            questions: arr,
          })
          .then((resp) => {
            dispatch(SetId(QuizId.state));
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="QuestionCard">
      {isLoading ? (
        <div class="loader"></div>
      ) : (
        <>
          <div className="QuestionCard__Question">
            Question : {props.Question.Question}
          </div>
          <div className="QuestionCard__Question">
            Question Type: {props.Question.Type}
          </div>
          Options:
          <div className="QuestionCard__Options">
            {props.Question.Options.map((element, index) => {
              if (props.Question.Answers.includes(`${index + 1}`)) {
                return (
                  <div
                    key={id1 + element + index}
                    className="QuestionCard__Options_Option_correct"
                  >
                    {element}
                  </div>
                );
              }
              return (
                <div
                  key={id2 + element + index}
                  className="QuestionCard__Options_Option"
                >
                  {element}
                </div>
              );
            })}
          </div>
          <div className="QuestionCard__Buttons">
            <i
              className="fa-solid fa-trash"
              onClick={() => {
                DeleteQuestion();
              }}
            ></i>
          </div>
        </>
      )}
    </div>
  );
}
