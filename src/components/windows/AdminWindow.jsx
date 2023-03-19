
import HelpCard from "../cards/HelpCard";
import QuestionPanel from "../panel/QuestionPanel";
import QuizPanel from "../panel/QuizPanel";
import CustomAlerts from "../alerts/CustomAlerts";
import AddQuestion from "../panel/AddQuestion";


export default function AdminWindow(){
    return(
        <div className="AdminWindow">
              <CustomAlerts />
            <QuizPanel />
            <QuestionPanel />
           
            <HelpCard />
           
            
        </div>
    )
}