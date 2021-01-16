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

	

		const responseFacebook = response => {
			logInWithProvider('facebook', response)
			console.log("facebook details: ", response)
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



