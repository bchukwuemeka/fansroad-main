import React, {useEffect, useState} from 'react';
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCog, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import fb from '../../images/fb1.jpg'
	

const Profile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInStatus = useSelector(state => state.loggedInStatus.payload);
	const [state, setState] = useState({
			user: {},
			message: ''
	});
	let current_user = JSON.parse(localStorage.getItem("current_user"))
	const asignUser =() => {
		if(current_user['tokenObj'] ){
			current_user = current_user['profileObj']
		}
		setState({...state, user: current_user})
		console.log('current_user: ', current_user)
		console.log('user: ', state.user)
	}
	useEffect(() => {
		setState({...state, user: current_user})
		asignUser()
  }, [])


		return (
			<>
				<div className='row user-profile'>
					<div className='col-md-8'>
						<div className='bg-image'>
							<p> <NavLink   exact to='/'><FontAwesomeIcon icon={faArrowLeft} size="1x" /> </NavLink>{current_user.name}</p>
							<p>0 No Post</p>
						</div>
						<div className='round-image float-left'>
							<img src={current_user.image } /> 
						</div>
						<div className='float-right edit-profile'>
							<NavLink  className="" exact to='/settings/profile'>
								<FontAwesomeIcon icon={faCog} size="1x" /> EDIT PROFILE </NavLink>
						</div>
						<div className='clearfix'></div>
						<div className='usersname-profile' > 
							<p>{current_user.name} </p>
							<span > @{current_user.username} Active</span>
						</div>

						<div className='bio-profile usersname-profile ' > 
							<p>{current_user.bio} </p>
							<span> <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />{current_user.location} </span>
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



