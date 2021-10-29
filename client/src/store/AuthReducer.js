const SET_USER  = "SET_USER"
const SET_AUTH  = "SET_AUTH"
const SET_SEARCHED_USRES  = "SET_SEARCHED_USRES"

const defaultState = {
    user: {},
    isAuth: false,
    searchedUsers: []
}

export default function AuthReducer(state = defaultState, action){
    switch(action.type){
        case SET_USER :
            return {...state, user: action.payload}
        case SET_AUTH :
            return {...state, isAuth: action.payload}
        case SET_SEARCHED_USRES :
            return {...state, searchedUsers: [...action.payload]}
        default:
            return state
    }
}

export const setUser = (user) => ({type:SET_USER, payload:user})
export const setAuth = (isAuth) => ({type:SET_AUTH, payload:isAuth})
export const setSearchedUsers = (searchedUsers) => ({type:SET_SEARCHED_USRES, payload:searchedUsers})


