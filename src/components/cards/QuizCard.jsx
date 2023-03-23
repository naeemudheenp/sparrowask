import { useDispatch } from "react-redux";
import { useState ,useEffect} from "react";
import { SetAlert, DisableAlert, SetId } from "../../actions";
import { useSelector } from "react-redux";
import axios from "axios";
export default function QuizCard({ Quiz }) {
  const dispatch = useDispatch();
  const [ButtonText,setButtonText] = useState()
  let QuizId1 = useSelector((state) => state.selectedtId);

  useEffect(() => {
    alert("hy")
  }, [ ButtonText]);
 

  function DeleteQuiz(QuizId) {
    axios
      .delete(process.env.REACT_APP_BASE_URL + QuizId)
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
        <button value="sf"
          onClick={(e) => {
            setButtonText(e)
            dispatch(SetId(Quiz.id));
            e.target.innerText="Selected"
          
            
          
          }}
        >
          Select
        </button>
      </div>
    </div>
  );
}
