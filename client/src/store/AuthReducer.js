const SET_USER  = "SET_USER"
const SET_AUTH  = "SET_AUTH"
const SET_SEARCHED_USRES  = "SET_SEARCHED_USRES"
const SET_CONVERSATONS  = "SET_CONVERSATONS"
const SET_CURRENT_CONVERSATON  = "SET_CURRENT_CONVERSATON"
const SET_CONVERSATION_MESSAGES = "SET_CONVERSATION_MESSAGES"
const UPDATE_CONVERSATION_MESSAGES = "UPDATE_CONVERSATION_MESSAGES"
const UPDATE_CONVERSATONS = "UPDATE_CONVERSATONS"

const defaultState = {
    user: {},
    isAuth: false,
    searchedUsers: [],
    conversations: [],
    currentConversation: {},

}

export default function AuthReducer(state = defaultState, action){
    switch(action.type){
        case SET_USER :
            return {...state, user: action.payload}
        case SET_AUTH :
            return {...state, isAuth: action.payload}
        case SET_SEARCHED_USRES :
            return {...state, searchedUsers: [...action.payload]}
        case SET_CONVERSATONS :
            return {...state, conversations: [...action.payload]}
        case UPDATE_CONVERSATONS :
            return {...state, conversations: [...state.conversations, action.payload]}
        case SET_CURRENT_CONVERSATON :
            return {...state, currentConversation: action.payload}
        case SET_CONVERSATION_MESSAGES :
            return {...state, currentConversation: {...state.currentConversation, messages: action.payload}}  
        case UPDATE_CONVERSATION_MESSAGES :
            if (state.currentConversation._id === action.payload.conversationId){
                return {...state, currentConversation: {...state.currentConversation, messages: [...state.currentConversation.messages, action.payload]}}  
            } else
            return state 
        default:
            return state
    }
}

export const setUser = (user) => ({type:SET_USER, payload:user})
export const setAuth = (isAuth) => ({type:SET_AUTH, payload:isAuth})
export const setSearchedUsers = (searchedUsers) => ({type:SET_SEARCHED_USRES, payload:searchedUsers})
export const setConversations = (сonversatios) => ({type:SET_CONVERSATONS, payload:сonversatios})
export const setCurrentConversation = (currentConversation) => ({type:SET_CURRENT_CONVERSATON, payload:currentConversation})
export const setConversationMessages = (messages) => ({type:SET_CONVERSATION_MESSAGES, payload:messages})
export const updateConversationMessages = (message) => ({type:UPDATE_CONVERSATION_MESSAGES, payload:message})
export const updateConversations = (сonversation) => ({type:UPDATE_CONVERSATONS, payload:сonversation})


