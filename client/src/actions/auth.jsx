export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const SET_USERNAME = 'SET_USERNAME';

export const setJwtToken = (jwtToken) => ({
    type: SET_JWT_TOKEN,
    payload: jwtToken
});

export const setUsername = (username) => ({
    type: SET_USERNAME,
    payload: username
});