import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { GoogleLogout } from 'react-google-login';
import PostIndex from '../componenets/post/postIndex'


const Home = ( ) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [state, setState] = useState({
     current_user: {},
		 loggedInStatus: ''
  });
	const isLoggedIn = JSON.parse(localStorage.getItem("current_user")) ? true : false
	
	const checkLoginStatus =() => {
		if(isLoggedIn){
			let user = JSON.parse(localStorage.getItem("current_user"))
			const loginStatus = 'LOGGED_IN'
			if(user['tokenObj']  ){
				user = user['profileObj']
			}
			setState({...state, current_user: user, loggedInStatus: loginStatus})
			
		}
	}
	useEffect(() => {
		checkLoginStatus()
  }, [])
	
    

  const displayContent = () => {
		if (state.current_user){
			return (
			<div className='home-bottom'>
				<h2> HOME</h2>
			</div> )
		}  
	}

    return (
			<div className="home-div">
				{displayContent()}
				<PostIndex />
			</div>
    );
}

export default Home;