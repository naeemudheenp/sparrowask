import { QuestionClass } from "../../classes/QuestionClass";
import { useState,useEffect, } from "react";
import { useDispatch,useSelector } from "react-redux";
import { SetAlert, DisableAlert } from "../../actions";
import axios from "axios";

export default function AddQuestion( {title}) {
   let FinalQuestion =new QuestionClass();

   const dispatch = useDispatch();
 

   const [input,setInput]= useState();
   const [Visibility,setVisibility] = useState("");
   const [Bot,setBot] = useState("Bot_Hidden")
  
   const [Dynamic,setDynamic]= useState([0,1,2,3,4,5,6]);
   const [Limit,setLimit] = useState(0);
   const [OptionLimit,setOption] = useState(0);
   const [FieldLimit,setField]= useState(0)
   const [StopLimit,setStop] = useState(0)
   const [Chat, setChat] = useState(0);

   const [Question,setQuestion] = useState("");
   const [Type,setType] = useState("");
   const [Answers,setAnswers] = useState([]);
   const [Correct,setCorrect] = useState([]);

   let QuizId = useSelector((state) => state.selectedtId);
  


   useEffect(() => {
    
   }, [Visibility,QuizId.state]);

   function UpdateChat(){
       if(Chat==1){

       if(input=="STOP"){
        return;
       }else{
        setAnswers(
            arr=>[...arr,input]
        )
       }


       }else{
        setQuestion(input)
        setChat(1);
        setLimit(1)
      

        setVisibility("AddQuestion__Chat_Replay")
       }
        
   }

   function SetterType(type){
        setType(type)
        setOption(1)
        setStop(1)

   }

   function SaveData(){

    if(Answers.length<=0 | Correct.length<=0){
        dispatch(SetAlert("Please Fill all Data."));
        alert("Please Fill All Data.")


        const timer = setTimeout(() => {
          dispatch(DisableAlert());
        }, 1000);
        return;
    }

    axios.get(`http://localhost:3001/quiz/${QuizId.state}/`).then(resp => {
        FinalQuestion.Question=Question;
        FinalQuestion.Type =Type;
        FinalQuestion.Answers =Correct;
        FinalQuestion.Options =Answers

    resp.data.questions.push(
        FinalQuestion
    )
    axios.patch(`http://localhost:3001/quiz/${QuizId.state}/`, {
        questions:resp.data.questions
}).then(resp => {
    setBot("Bot_Hidden");
    setAnswers([])
    setCorrect([])
    setQuestion("")
    setLimit(0)
    setOption(0)
    setField(0)
    setChat(0)
    setVisibility("")
    setStop(0)
    
    
    dispatch(SetAlert("Question Added"));
    


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
    <div className="AddQuestion">
            <div className={Bot}>
            <div className="AddQuestion__Chat__Header">
          <i className="fa-solid fa-robot"></i>
          SparrowBot - {title}
        </div>
      <div className="AddQuestion__Chat">
       
        <div className="AddQuestion__Chat_Main">
        <i style={{visibility: "hidden"}} className="fa-solid fa-robot"></i> <div> Hey ! I am SparrowBot. 
            Selected quiz is {title}
            I will help you in building questions. :)</div>
        </div>

        <div className="AddQuestion__Chat_Main">
        <i className="fa-solid fa-robot"></i> <div> What is your question ?</div>
        </div>

        <div className={Visibility}>
        <div> {Question}</div>
        </div>

      
      
        {Dynamic.slice(0,Limit).map(()=>{
            return(
                <>
                   <div className="AddQuestion__Chat_Main">
        <i className="fa-solid fa-robot"></i> <div> Please Choose Question Type ?</div>
        </div>
       
        <div className="AddQuestion__Chat_Types">
            <div onClick={()=>{
                SetterType("DropDown")
            }} className="AddQuestion__Chat_Types_Type">
                DropDown
            </div>

            <div onClick={()=>{
                SetterType("CheckBox")
            }}   className="AddQuestion__Chat_Types_Type">
                CheckBox
            </div>

            <div onClick={()=>{
                SetterType("Radio")
            }}  
             className="AddQuestion__Chat_Types_Type">
                Radio
            </div>
        </div>
                </>
            )
        })}

{Dynamic.slice(0,OptionLimit).map(()=>{
            return(
                <>
                   <div className="AddQuestion__Chat_Main">
        <i className="fa-solid fa-robot"></i> <div> Enter Options and Mark Options Which Are Correct. Press STOP When finished.</div>
        </div>
       
      
                </>
            )
        })}

{Dynamic.slice(0,FieldLimit).map(()=>{
            return(
                <>
                  
        <div className={Visibility}>
        <div> {Question}</div>
        </div>

       
      
                </>
            )
        })}

        {
            Answers.map((elements,index)=>{

                return(
                    Type=="CheckBox" ? (
                        <div className="AddQuestion__Chat_Replay">
                    <input name="ss" type="checkbox" value={index+1} onChange={(e)=>{
                        let temp = []
                        temp.push(e.target.value)
                          setCorrect(
                           arr=>[...arr,e.target.value]

                        )
                        alert(Correct)
                    }}></input>
                    Option {index+1} : {elements}</div>
                    ):(
                    <div className="AddQuestion__Chat_Replay">
                    <input name="ss" type="radio" value={index+1} onChange={(e)=>{
                        let temp = []
                        temp.push(e.target.value)
                          setCorrect(
                           temp

                        )
                        alert(Correct)
                    }}></input>
                    Option {index+1} : {elements}</div>)
                );

            })
        }

        {
            Dynamic.slice(0,StopLimit).map(()=>{
                return(
                    <button className="AddQuestion__Chat_Stop" onClick={()=>{
                        alert("hy")
                        SaveData()}}>STOP  & SAVE</button>
                )
            })
        }

        




      </div>
      <div className="AddQuestion__Chat_Input">
            <input onChange={(e)=>{
                setInput(e.target.value)
            }} type="text"></input>
            <button onClick={(e)=>{
                e.target.value="";
                UpdateChat()}}>Send</button>
        </div>
            </div>
      <div onClick={()=>{
        alert(QuizId.state)
        if(QuizId.state==null){
            alert("Please select a quiz")
        }else{
            setBot("")}
        }
      
    
    } className="AddQuestion__Float">+</div>
    </div>
  );
}