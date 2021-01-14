import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Home from './home'
import axios from 'axios';
import Login from './auth/Login'
import { LOGGEDINSTATUS, GETCURRENTUSER } from '../action/type'
import Registration from './auth/Registration';
import PrivateRoute from './privateComponent';
import Navbar from './navbar/navbar';
import Footer from './navbar/footer';
import Notification from './notification/notification';
import Post from './post/post';
import Chat from './chat/chat';
import Profile from './profile/profile';
import EditProfile from './profile/editProfile';


const App = () => {
	const [state, setState] = useState({
     current_user: {},
		 loggedInStatus: ''
  });
	const dispatch = useDispatch();
	const history = useHistory();
	
	const checkLoginStatus = async () => {
		const endpoint = "http://localhost:3000/api/v1/logged_in"
		try {
					const res = await axios.get( endpoint,  { withCredentials: true })
					if(res.data.logged_in ){
						localStorage.setItem("current_user", JSON.stringify(res.data['user']));
						setState({ ...state, current_user: res.data.user, 
						loggedInStatus: 'LOGGED_IN'});
						history.push('/')
					} 
					console.log("you  ", res)
				
				}catch(error)  {
        console.log("registration error", error);
      }			
	}
	
	useEffect(() => {
		checkLoginStatus()
		dispatch({ type: LOGGEDINSTATUS, payload: state.loggedInStatus})
		dispatch({ type: GETCURRENTUSER, payload: state.current_user})
  }, [])


	return (
		<div>
			<Navbar />
			<Switch>
				
				{/* <Route exact path='/' component={SignIn} /> */}
				<Route exact path='/register' component={Registration}/>
				<Route exact path='/notification' component={Notification}/>
				<Route exact path='/profile' component={Profile}/>
				<Route exact path='/chat' component={Chat}/>
				<Route exact path='/post/create' component={Post}/>
				<Route exact path='/login' component={Login}/>
				<Route exact path='/settings/profile' component={EditProfile}/>
				<PrivateRoute path="/" component={Home} />
			</Switch>
			<Footer />
		</div>
	)
}

export default App;