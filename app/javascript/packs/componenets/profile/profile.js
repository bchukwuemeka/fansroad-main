import React, {useEffect, useState} from 'react';
import { useHistory, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCog, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import fb from '../../images/fb1.jpg'
	

const Profile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {username} = useParams()
	const loggedInStatus = useSelector(state => state.loggedInStatus.payload);
	const [state, setState] = useState({
			user: {},
			message: ''
	});
	let current_user = JSON.parse(localStorage.getItem("current_user"))
	const current_user1 = JSON.parse(localStorage.getItem("current_user")) ? true : false;
	const getUser = async () => {
		try {
					const res = await axios.get(`http://localhost:3000/api/v1/users/${username}`);
					setState({...state, user: res.data})
					console.log('user res: ', res)
					console.log('user new: ', state.user)
			} catch (err) {
					console.error('user fetch failed', err);
			}
	}
	const editInfo = () =>{
		if (current_user1){
			if(state.user.username === current_user.username){
				console.log('user new: ', state.user)
				return (
					<div className='float-right edit-profile'>
		
				<NavLink  className="" exact to={`/settings/${state.user.username}`}>
				<FontAwesomeIcon icon={faCog} size="1x" /> EDIT PROFILE </NavLink>
				</div>
				)
			}
		}
	}
	useEffect(() => {
		getUser()
  }, [username])


		return (
			<>
				<div className='row user-profile'>
					<div className='col-md-8'>
						<div className='bg-image'>
							<p> <NavLink   exact to='/'><FontAwesomeIcon icon={faArrowLeft} size="1x" /> </NavLink>{state.user.name || ''}</p>
							<p>0 No Post</p>
						</div>
						<div className='round-image float-left'>
							<img src={state.user.image || ''} /> 
						</div>
						{editInfo()}
						<div className='clearfix'></div>
						<div className='usersname-profile' > 
							<p>{state.user.name || ''} </p>
							<span > @{state.user.username || ''} Active</span>
						</div>

						<div className='bio-profile usersname-profile ' > 
							<p>{state.user.bio || ''} </p>
							<span> <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />{state.user.location || ''} </span>
						</div>

					</div>
					<div className='col-md-4'>

					</div>
				</div>
			</>
				
		)
}

Profile.defaultProps = {
    image: "https://www.clipartmax.com/png/middle/40-400884_social-media-avatar-photography-digital-media-clip-social-media-avatar-photography-digital.png",
    eyeColor: "deepblue",
    age: "120"
}

export default Profile;



