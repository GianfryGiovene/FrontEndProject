const initialState = {
    user: null,
}

const authReducer = (actualState = initialState, action) => {
    switch(action.type){
        case "user/login":
            return {...actualState,  user: action.payload}
        case "user/logout":
            return {...actualState, user: null}
        default:
            return actualState            
    }
}

export default authReducer;