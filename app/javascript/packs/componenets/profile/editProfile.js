import React, {useEffect, useState} from 'react';
import { useHistory, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'


const EditProfile = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInStatus = useSelector(state => state.loggedInStatus.payload);
	const current_user = JSON.parse(localStorage.getItem("current_user")) ? true : false
	let user = JSON.parse(localStorage.getItem("current_user"))
	const [state, setState] = useState({
     email:'',
     name: '',
		 username: '',
		 bio: '',
		 location: '',
		 website: '',
		 amazon: '',
		 message: ''
  });

	const asignUser =() => {
		if(user['tokenObj'] ){
			user = user['profileObj']
		}
		setState({...state, email: user['email'], 
		name: user['name'], username: user['username'],
		bio: user['bio'], location: user['location'], 
		website: user['website'], amazon: user['amazon']})	
	}
	useEffect(() => {
		asignUser()
  }, [])
	
	const handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
    setState({
			...state, [name]: value 
    });
  }

	
	const handleSubmit = async (event) => {
		const endpoint = `/api/v1/users/${user.id}`;
		const { email, name, username, bio, location, website, amazon } = state;
		event.preventDefault()
		try {
					const res = await axios.patch( endpoint,
					{
            email: email,
            name: name,
						username: username,
						bio: bio,
						location: location,
						website: website,
						amazon: amazon
          },
					  { withCredentials: true })
					
						localStorage.setItem("current_user", JSON.stringify(res.data.data['user']));
						setState({...state, message: 'User updated successfully'})
						// console.log('message: ',state.message)				
					
				}catch(error)  {
					setState({...state, message: `${error}`})
        	console.log("registration error", error);
      }
			
	}



		return (
			<>
				<div className="row update-user">
					<span className='notice'>{state.message}</span>
					<div className='col-md-4'>
						<p> <NavLink   exact to={`/${current_user.username}`}><FontAwesomeIcon icon={faArrowLeft} size="1x" /> </NavLink> Settings </p>
					</div>
					<div className='col-md-8'>
						<form onSubmit={handleSubmit}>
							
							<div className="form-floating mb-4">
								<label htmlFor="form1Example3">Username</label>
								<input
									type="name" name="username" id="form1Example3"
									className="form-control" value={state.username} 
									onChange={handleChange}  
								/>
								 <small  className="form-text text-muted">your unique username.</small>
							</div>	
							<div className="form-floating mb-4">
								<input
									type="email" name="email" id="form1Example1"
									className="form-control" value={state.email}
									 disabled 
								/>
								<small  className="form-text text-muted">your Email can't be changed.</small>
							</div>
			
							<div className="form-floating mb-4">
								<input
									type="name" name="name" id="form1Example2"
									className="form-control" value={state.name}
									onChange={handleChange}  required
								/>
								<small  className="form-text text-muted">This is your display name.</small>
							</div>	
							
							<div className="form-floating mb-4">
								<textarea
									type="textarea" name="bio" id="form1Example4"
									className="form-control" value={state.bio || ''} 
									placeholder="bio"
									onChange={handleChange} 
									rows="3"
								> </textarea>
								<small  className="form-text text-muted">something about yourself.</small>
							</div>
							<div className="form-floating mb-4">
								<input
									type="name" name="location" id="form1Example2"
									className="form-control" value={state.location}
									onChange={handleChange}  
									placeholder="location"
								/>
								<small  className="form-text text-muted">your location city/country.</small>
							</div>	
							<div className="form-floating mb-4">
								<input
									type="text" name="website" id="form1Example5"
									className="form-control" value={state.website || ''} 
									placeholder="Website Url"
									onChange={handleChange}  
								/>
								<small  className="form-text text-muted">your website url if any.</small>
							</div>
							<div className="form-floating mb-4">
								<input
									type="text" name="amazon" id="form1Example6"
									className="form-control" value={state.amazon || ''} 
									placeholder="Amazon Whitelist"
									onChange={handleChange}  
								/>
							</div>
							
							<button type="submit" className="btn btn-primary ">Save</button>

						</form>
					</div>
				</div>
			</>
				
		)
}

export default EditProfile;



