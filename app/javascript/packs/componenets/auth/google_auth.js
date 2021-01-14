import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import {logInWithProvider} from './social_media_auth';
import { LOGGEDINSTATUS, GETCURRENTUSER } from '../../action/type'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import google from '../../images/google.png'

const GoogleAuth = () => {
	const dispatch = useDispatch();
	const history = useHistory();
		const [home, setHome] = useState('');
	// const checkLoginStatus =() => {
	// 	axios
  //     .get(
  //       "http://localhost:3000/api/v1/logged_in",
  //       { withCredentials: true }
  //     )
  //     .then(response => {
	// 			if(response.data.logged_in ){
	// 				history.push('/')
	// 				console.log("check if logged in", response.data)
	// 				dispatch({ type: LOGGEDINSTATUS, payload: 'LOGGED_IN'})
	// 				dispatch({ type: GETCURRENTUSER, payload: response.data.user})
	// 			} 
  //     })
  //     .catch(error => {
  //       console.log("check login error", error);
  //     });
	// }
	
	// useEffect(() => {
	// 	checkLoginStatus()
  // }, )

		const responseGoogle = response => {
			logInWithProvider('google', response)
			localStorage.setItem("current_user", JSON.stringify(response));
			console.log('google user', response)
			history.push('/')
		}
		const responseGoogleFailure = response => {
			console.log('google login failed', response)
		}

		
		return (
			<>
				<br />
				<br />
				
				<GoogleLogin 
					clientId = '150361839161-e76sgvul3eas6in7d6o6veuf4d5hgfsb.apps.googleusercontent.com'
					// buttonText = "Login with Google"
					render={renderProps => (
							<a 
							onClick={renderProps.onClick} disabled={renderProps.disabled}>
								<img src={google}/></a>
						)}
					onSuccess={responseGoogle}
					onFailure={responseGoogleFailure}
					className="btn btn-outline-danger"
					cookiePolicy={'single_host_origin'}
					isSignedIn={true}
				/>
			<br />
			<br />
			</>
		)
}

export default GoogleAuth;



