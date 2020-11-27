const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST:
            const newPost = {
                id: state.posts.length + 1,
                message: action.payload,
                like: 0
            };
            return {
                ...state,

            }
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.payload;
            return state;
        default:
            return state;
    }
}

export const addPostActionCreator = (post) => ({type: ADD_POST, payload: post});
export const updateNewPostTextActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT, payload: text});

export default profileReducer;