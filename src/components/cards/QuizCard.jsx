
import { useDispatch } from "react-redux";
import { SetAlert, DisableAlert, SetId } from "../../actions";
import axios from "axios";
export default function QuizCard({ Quiz }) {
  const dispatch = useDispatch();
  

  function DeleteQuiz(QuizId) {
    

    axios
      .delete(`http://localhost:3001/quiz/${QuizId}/`)
      .then((resp) => {
        
        dispatch(SetAlert("Quiz Deleted"));


        const timer = setTimeout(() => {
          dispatch(DisableAlert());
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });

 
  }

  return (
    <div className="QuizCard">
      <div>
       Title:
        {Quiz.title}
      </div>
      <div>
        Description:
        {Quiz.description}
      </div>
      <div>
        Pass Percentage:
        {Quiz.percentage}
      </div>

      <div>
        No. Of Questions:
        {Quiz.questions.length}
        <div></div>
      </div>
      <div className="QuizCard__Buttons">
      <i
        className="fa-solid fa-trash"
        onClick={() => {
          DeleteQuiz(Quiz.id);
        }}
      ></i>
      <button onClick={()=>{
        dispatch(SetId(Quiz.id))
       
      }}>Select</button>
      </div>
    </div>
  );
}
