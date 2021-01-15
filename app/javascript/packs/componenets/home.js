import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { GoogleLogout } from 'react-google-login';


const Home = ( ) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [state, setState] = useState({
     current_user: {},
		 loggedInStatus: ''
  });
	const isLoggedIn = JSON.parse(localStorage.getItem("current_user")) ? true : false
	const handleLogout = () => {
		localStorage.clear();
		axios
      .delete("http://localhost:3000/api/v1/logout",  { withCredentials: true })
      .then(response => {
					console.log("check logout", response)
        	dispatch({ type: GETCURRENTUSER, payload: {}});
					dispatch({ type: LOGGEDINSTATUS, payload: 'NOT_LOGGED_IN'});
					history.push("/login")
      })
      .catch(error => {
        console.log("logout error", error);
      });
	}
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
			<div>
				<h2> Hello {state.current_user.name}</h2>
				<h5> Logged in as: {state.current_user.email} </h5>
				<GoogleLogout
					clientId = '150361839161-e76sgvul3eas6in7d6o6veuf4d5hgfsb.apps.googleusercontent.com'
					buttonText="Logout"
					render={renderProps => (
							<button className="btn btn-outline-primary"
							onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
						)}
					onLogoutSuccess={handleLogout}
				></GoogleLogout>
			</div> )
		}  else {
			return (
				<div> <h1> THE HOME PAGE</h1></div>
			)
		}
	}

    return (
			<div className="container">
				
				{displayContent()}
				
				{/* {console.log(current_user)} */}
			</div>
    );
}

export default Home;