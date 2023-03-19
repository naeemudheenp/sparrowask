function customAlert(state="CustomAlerts",action){
   
    switch(action.type){
       
        case true : return {state:"CustomAlerts",message:action.payLoad}
                    
        case false : return state="CustomAlerts "
                    
        default: return state="CustomAlerts";                        
    }

}

export default customAlert;