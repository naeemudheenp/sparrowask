import { useEffect, useState, useId } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import QuestionCard from "../cards/QuestionCard";
import AddQuestion from "./AddQuestion";

import { SetAlert, DisableAlert } from "../../actions";
export default function QuestionPanel() {
  const dispatch = useDispatch();
  
  const id1 = useId();
  const id2 = useId();
  const id3 = useId();
  const [Questions, SetQuestions] = useState([]);
  const [Basic,SetBasic] = useState([]);
  const [Title,SetTile] = useState("none")
  let ClassAlert = useSelector((state) => state.customAlert);
  let QuizId = useSelector((state) => state.selectedtId);

  useEffect(() => {
  alert(`ogg ${QuizId.state}`)
   if(!isNaN(QuizId.state) && QuizId.state!=null){
    alert(`ogg1 ${QuizId.state}`)
    GetQuestions();
   }
  },[ClassAlert.state, QuizId.state]);

 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function GetQuestions() {
    let data;

    await axios
      .get(`http://localhost:3001/quiz/${QuizId.state}`)
      .then((resp) => {
        data = resp.data;
        console.log(`Form Questions ${data.questions.length}`);
      })
      .catch((error) => {
        console.log(error);
      });
    SetBasic(data)
    SetTile(data.title)
    SetQuestions(data.questions);
    console.log(`data length is ${Questions.length}`);
  }

  function MoveUp(index) {
    axios
      .get(`http://localhost:3001/quiz/${QuizId.state}`)
      .then((resp) => {
        let arr = resp.data.questions;

     
        let temp = arr[index];

        arr[index] = arr[index - 1];

        arr[index - 1] = temp;

        axios
          .patch(`http://localhost:3001/quiz/${QuizId.state}`, {
            questions: arr,
          })
          .then((resp) => {
            dispatch(SetAlert("Question ReArranged"));

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

  function MoveDown(index) {
    axios
      .get(`http://localhost:3001/quiz/${QuizId.state}`)
      .then((resp) => {
        let arr = resp.data.questions;

        
        let temp = arr[index];

        arr[index] = arr[index + 1];

        arr[index + 1] = temp;

        axios
          .patch(`http://localhost:3001/quiz/${QuizId.state}`, {
            questions: arr,
          })
          .then((resp) => {
            dispatch(SetAlert("Question ReArranged"));

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
    
    <div className="QuestionPanel">
      
        {
        Basic == undefined ? (
           <div className="QuestionPanel__Header">Please Select A Quiz</div>
        ) : (
          
            <div className="QuestionPanel__Header">
             
            <div>Title : {Basic.title}</div>
            <div>Description : {Basic.description}</div>
            <div>Pass Percentage : {Basic.percentage}</div>
           
            </div>
          
        )
        }
    
      {Questions.length <= 0 ? (
        <div>No Questions added. </div>
      ) : (
        Questions.map((element, index) => {
            if (index == 0) {
              return (
                <div className="QuestionPanel__Items">
                       <div className="QuestionPanel__Items_Arrows">
                    <div
                      onClick={() => {
                        MoveDown(index);
                      }}
                      className="QuestionPanel__Items_Arrows_Arrow"
                    >
                      <i class="fa-solid fa-arrow-down"></i>
                    </div>
                  </div>
                  <QuestionCard key={id3}  Question={element} />
             
                </div>
              );
            } else if (index + 1 == Questions.length) {
              return (
                <div className="QuestionPanel__Items">
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
                  <QuestionCard key={id2}   Question={element} />
                
                </div>
              );
            } else {
          return (
            <div className="QuestionPanel__Items">
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
              <QuestionCard key={id1}  Question={element} />
            </div>
          );
            }
        })
      )}
      <AddQuestion title= {Title} />
    </div>
    
  );
  
}
