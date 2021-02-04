import {combineReducers} from 'redux';
import { GETCURRENTUSER, LOGGEDINSTATUS, GETCOMMENTS } from '../action/type';


const currentUserReducer = (state = {}, {type, payload}) =>{
	switch (type){
		case GETCURRENTUSER:
			return {...state, payload}
		default:
			return state;
	} 
}

const loggedInReducer = (state = {}, {type, payload}) =>{
	switch (type){
		case LOGGEDINSTATUS:
			return {...state, payload}
		default:
			return state;
	} 
}

const commentsReducer = (state = {}, {type, payload}) =>{
	switch (type){
		case GETCOMMENTS:
			return [...state, payload]
		default:
			return state;
	} 
}

const rootReducer = combineReducers({
	current_user: currentUserReducer,
	loggedInStatus: loggedInReducer,
	comments: commentsReducer
})

export default rootReducer;