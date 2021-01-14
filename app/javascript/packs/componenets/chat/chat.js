import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faPlusCircle, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons'
	

const Chat = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInStatus = useSelector(state => state.loggedInStatus.payload);
	const current_user = JSON.parse(localStorage.getItem("current_user")) ? true : false
	
		const displayNav = () => {
			if(current_user){
				return(
					
					<div className="col">
						user message Page
					</div>

				)
			}
		}
	


		return (
			<>
			{displayNav()}
			</>
				
		)
}

export default Chat;

