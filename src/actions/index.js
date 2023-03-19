

export function SetAlert(message){
 
    return {
        payLoad:message,
        type:true,
     
        
    }
}

export function DisableAlert(){
    return {
        type:false
    }
}

export function SetId(message){
   
    return {
        payLoad:message,
        type:'SetId',
     
        
    }
}