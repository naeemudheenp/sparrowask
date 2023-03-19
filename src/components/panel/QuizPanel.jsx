import React from "react";
import { useEffect, useState,useId } from "react";
import { QuizClass } from "../../classes/QuizClass";
import axios from "axios";
import QuizCard from "../cards/QuizCard";
import { useSelector,useDispatch } from "react-redux";
import AddQuiz from "./AddQuiz";
import { SetId } from "../../actions";
export default function QuizPanel() {

  const [Quizes, SetQuizes] = useState([]);
  let ClassAlert = useSelector(state => state.customAlert)
  const dispatch = useDispatch();
  const id = useId();

  useEffect(() => {
    GetQuizes();
   
  },[ClassAlert.state]);



  async function GetQuizes() {
  
    let data;

   await axios.get('http://localhost:3001/quiz')
    .then(resp => {
        data = resp.data;

        
        
    })
    .catch(error => {
        console.log(error);
    });

  
   
    SetQuizes(data);
  }

  return <div className="QuizPanel">
    <AddQuiz />
    {
        Quizes?.length > 0 ? (
           
                    Quizes.map((element) => {
                       return(
                        <  QuizCard  key={element.id} Quiz={element} />
                       )
                    })
              
        ):(
            <div className="QuizPanel__Error">
                none
            </div>
        ) 
    }
  </div>;
}
