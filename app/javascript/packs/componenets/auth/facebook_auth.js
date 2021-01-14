import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {logInWithProvider} from './social_media_auth';
import { LOGGEDINSTATUS, GETCURRENTUSER } from '../../action/type'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import fb from '../../images/fb1.jpg'


const FacebookAuth = () => {
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
	// 				console.log("check if logged in", response.data)
	// 				dispatch({ type: LOGGEDINSTATUS, payload: 'LOGGED_IN'})
	// 				dispatch({ type: GETCURRENTUSER, payload: response.data.user})
	// 				history.push('/')
	// 			} 
  //     })
  //     .catch(error => {
  //       console.log("check login error", error);
  //     });
	// }

	// useEffect(() => {
	// 	checkLoginStatus()
	// 	console.log("great is working")
  // }, [home])

		const responseFacebook = response => {
			console.log("user details: ", response)
			logInWithProvider('facebook', response)
			localStorage.setItem("current_user", JSON.stringify(response));
			history.push('/')
		}

		
		return (
			<>
			<FacebookLogin 
				appId='1296818890680938'
				autoLoad={true}
				textButton='Login with Facebook'
				fields='name,email,picture'
				callback={responseFacebook}
				render={renderProps => (
							<a 
							onClick={renderProps.onClick} disabled={renderProps.disabled}>
								<img src={fb}/> Login with Facebook</a>
						)}
				cssClass='btn btn-primary btn-block'
			/>
			
			</>
		)
}

export default FacebookAuth;



