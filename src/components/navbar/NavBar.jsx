import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { CurrentQuestion } from "../../actions";



export default function NavBar(){
    


    return (
        <div className="NavBar">
            <div className="NavBar__Logo">
                SparrowASK 
            </div>
        </div>
    );
}