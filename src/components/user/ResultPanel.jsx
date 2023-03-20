import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResultClass } from "../../classes/ResultClass";
import axios from "axios";
export default function  ResultPanel(){

    let { id } = useParams();
    
    let Result = new ResultClass("","","","")
     Result= localStorage.getItem(id)
     Result = JSON.parse(Result)
  
     console.log(Result)


    

    useEffect(() => {
      
    }, []);


    return(
      
            
           Result.result ? (
            <div className="ResultPanel">
             <div className="ResultPanel__Result">
                <i class="fa-solid fa-face-smile"></i>
                <div className="ResultPanel__Result_Header">
                    Hooray ! You Have Passed The Test.
                </div>
                <div className="ResultPanel__Result_Info">
                    <div>Your Percentage : {Result.percentage}</div>
                    <div>Correct Answers : {Result.correct}</div>
                    <div> Total Question : {Result.total}</div>
                    
                   
                </div>
             </div>
             </div>
           ):(
            <div className="ResultPanel Fail">
            <div className="ResultPanel__Result">
               <i class="fa-solid fa-face-sad-cry"></i>
               <div className="ResultPanel__Result_Header">
                   Oops ! You Failed The Test.
               </div>
               <div className="ResultPanel__Result_Info">
                   <div>Your Percentage : {Result.percentage}</div>
                   <div>Correct Answers : {Result.correct}</div>
                   <div> Total Question : {Result.total}</div>
                   
                  
               </div>
            </div>
            </div>
          )
           
           
        
    )
}