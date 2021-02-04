import React, {useEffect} from 'react';
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { GETCURRENTUSER, LOGGEDINSTATUS } from '../../action/type'
import axios from 'axios';
// import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faPlusCircle, faComment, faCog,
				faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
	

const Footer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInStatus = useSelector(state => state.loggedInStatus.payload);
	const current_user = JSON.parse(localStorage.getItem("current_user")) ? true : false;
	const  user = JSON.parse(localStorage.getItem("current_user"))
	
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

	
	const displayNav = () => {
		if(current_user){
			return(
				<div className="navbar container-fluid row footer">
				<div className="col">
					<NavLink  activeClassName="active" exact to='/'><FontAwesomeIcon icon={faHome} size="2x" /> </NavLink>
    		</div>
				<div className="col">
					<NavLink  activeClassName="active" exact to='/notification'><FontAwesomeIcon icon={faBell} size="2x" /></NavLink>
				</div>
				<div className="col">
						<NavLink  activeClassName="active" exact to='/post/create'><FontAwesomeIcon icon={faPlusCircle} size="2x" /></NavLink>
				</div>
				<div className="col">
						<NavLink  activeClassName="active" exact to='/chat'><FontAwesomeIcon icon={faComment} size="2x" /></NavLink>
				</div>
			
				<div className="dropup col">
					<a type="button" className="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<FontAwesomeIcon icon={faUserCircle} size="2x" />
					</a>
					<div className="dropdown-menu dropup-menu" aria-labelledby="footer">
						<NavLink   exact to={`/${user.username}`}> <FontAwesomeIcon icon={faUserCircle} size="1x" />
						Profile</NavLink>
						<a className="dropdown-item" href="#">Another action</a>
						<a className="dropdown-item" href="#">Something else here</a>
						<NavLink  className="dropdown-item" exact to={`/settings/${user.username}`}><FontAwesomeIcon icon={faCog} size="1x" /> Settings</NavLink>
									<GoogleLogout
								clientId = '150361839161-e76sgvul3eas6in7d6o6veuf4d5hgfsb.apps.googleusercontent.com'
								buttonText="Logout"
								render={renderProps => (
										<a className="dropdown-item"
										onClick={renderProps.onClick} disabled={renderProps.disabled}> 
										<FontAwesomeIcon icon={faSignOutAlt} size="1x" />
										Log out</a>
									)}
								onLogoutSuccess={handleLogout}
							></GoogleLogout>
						
					</div>
				</div>

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

export default Footer;



