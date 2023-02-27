const initState={
    city:undefined,
    date:[{startDate: new Date(),
        endDate: new Date(),
        key: "selection"}],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined,
    },
    user:null,
    loading:false,
    error:null
}
export const addreducer=(state=initState,action)=>{
    console.log(action)
    switch(action.type){
        case "NEW_SEARCH":
            return {...state,...action.payload}
        case "RESET_SEARCH":
            return initState
        case "LOGIN_START":
            return {...state,loading:true}
        case "LOGIN_SUCCESS":
            return {...state,loading:false,user:action.payload}
        case "LOGIN_FAILURE":
            return {...state,loading:false,error:action.payload}
        case "LOGOUT":
            return {...state,user:null,loading:false,error:null}
        default:
            return state;
    }
}