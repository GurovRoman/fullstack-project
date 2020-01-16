import { createStore, combineReducers, applyMiddleware } from 'redux';
import {jwtTokenReducer, usernameReducer} from "./auth";

const logger = store => next => action => {
	let result;
	console.groupCollapsed("dispatching", action.type);
	console.log('prev state', store.getState());
	console.log('action', action);
	result = next(action);
	console.log('next state', store.getState());
	console.groupEnd();
	return result;
};

const saver = store => next => action => {
	let result = next(action);
	localStorage['web-storage'] = JSON.stringify(store.getState());
	return result;
};

const initStorage = (initialState = {}) => {
	return initialState =
		localStorage['web-storage'] ?
			JSON.parse(localStorage['web-storage']) :
			initialState;
};

export const storeFactory = (initialState = {}) => (
	applyMiddleware(logger, saver)(createStore)(
		combineReducers({
			jwtToken: jwtTokenReducer,
			username: usernameReducer
		}), initStorage(initialState)
	)
);