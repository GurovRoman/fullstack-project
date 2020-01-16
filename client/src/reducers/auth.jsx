import {SET_JWT_TOKEN, SET_USERNAME} from "../actions";

const initialStateToken = {jwtToken : null};

export const jwtTokenReducer = (state = initialStateToken, action) => {
    switch (action.type) {
        case SET_JWT_TOKEN:
            if (action.payload)
                return {
                    accessToken: action.payload.accessToken,
                    tokenType: action.payload.tokenType
                };
            return null;
        default:
            return state;
    }
};


const initialStateUsername = {username : ""};

export const usernameReducer = (state = initialStateUsername, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return action.payload;
        default:
            return state;
    }
};