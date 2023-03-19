import { useId } from "react";
import { useDispatch } from "react-redux";
import { SetAlert, DisableAlert } from "../../actions";
import axios from "axios";
export default function QuestionCard({ Question }) {
  const dispatch = useDispatch();
  const id1 = useId();
  const id2 = useId();

  function DeleteQuestion(QuestionId) {
   
    axios.get('http://localhost:3001/quiz/2/').then(resp => {

 

resp.data.questions.splice(QuestionId,1)

axios.patch('http://localhost:3001/quiz/2/', {
    questions:resp.data.questions
}).then(resp => {



dispatch(SetAlert("Question Deleted"));



const timer = setTimeout(() => {
  dispatch(DisableAlert());
}, 1000);

console.log(resp.data);

}).catch(error => {

console.log(error);
});


console.log(resp.data.questions);
}).catch(error => {

console.log(error);
});


 
  }

  return (
    <div className="QuestionCard">
        <div className="QuestionCard__Question">
               Question : {Question.Question}
        </div>
        <div className="QuestionCard__Question">
        Question Type:  {Question.Type}
        </div>
        Options:
        <div className="QuestionCard__Options">
            {
                Question.Options.map((element,index)=>{
                   
                    if(Question.Answers.includes(`${index+1}`)){
                        return (
                            <div key={id1} className="QuestionCard__Options_Option_correct">
                                {element}
                            </div>
                        )
                    }
                    return (
                        <div key={id2} className="QuestionCard__Options_Option">
                            {element}
                        </div>
                    )
                })
            }
        </div>
    
    
      

     
      <div className="QuestionCard__Buttons">
      <i
        className="fa-solid fa-trash"
        onClick={() => {
          DeleteQuestion(Question.id);
        }}
      ></i>
      
      </div>
    </div>
  );
}
