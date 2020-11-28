import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

const state = {
    posts: [
        {id: 1, message: 'How are you', like: 5},
        {id: 2, message: 'Its my post 2', like: 10},
        {id: 3, message: 'Post 3', like: 15},
    ]
}

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

it('The message of posts[2] is "it-kamasutra.com"', () => {
    // 1. test data
    let action = addPostActionCreator("it-kamasutra.com");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[3].message).toBe("it-kamasutra.com");
});

it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(2);
});

it('after deleting length shouldn\'t be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(1000);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});