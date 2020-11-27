const SEND_MESSAGE = "SEND-MESSAGE";

const initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'},
    ],
    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you"},
        {id: 3, message: "Yo"},
    ],
}

export const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE: 
            let body = action.payload
            return {
                ...state,
                messages: [
                    ...state.messages, 
                    {
                        id: state.messages.length + 1,
                        message: body
                    }
                ],
            };
        default:
            return state;
    }
}

export const sendMessageCreator = (message) => ({type: SEND_MESSAGE, payload: message});

export default dialogsReducer;