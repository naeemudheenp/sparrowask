import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetAlert, DisableAlert } from "../../actions";
import axios from "axios";
export default function QuestionCard(props) {
  const dispatch = useDispatch();
  const id1 = useId();
  const id2 = useId();

 


  
 
  let QuizId = useSelector((state) => state.selectedtId);
 

  function DeleteQuestion() {
 
    axios
    .get(`http://localhost:3001/quiz/${QuizId.state}`)
    .then((resp) => {
      let arr = resp.data.questions;

      
      arr.splice(props.index,1)

      axios
        .patch(`http://localhost:3001/quiz/${QuizId.state}`, {
          questions: arr,
        })
        .then((resp) => {
          dispatch(SetAlert("Question Deleted"));

          const timer = setTimeout(() => {
            dispatch(DisableAlert());
          }, 1000);

          console.log(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(resp.data.questions);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="QuestionCard">
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
              <div key={id1} className="QuestionCard__Options_Option_correct">
                {element}
              </div>
            );
          }
          return (
            <div key={id2} className="QuestionCard__Options_Option">
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
    </div>
  );
}
