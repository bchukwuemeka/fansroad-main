import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
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
		 message: ''
  });

	const asignUser =() => {
		if(user['tokenObj'] ){
			user = user['profileObj']
		}
		setState({...state, email: user['email'], name: user['name']})	
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
		const { email, name } = state;
		event.preventDefault()
		try {
					const res = await axios.patch( endpoint,
					{
            email: email,
            name: name
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
						SETTINGS
					</div>
					<div className='col-md-8'>
						<form onSubmit={handleSubmit}>
									
							<div className="form-floating mb-4">
								<input
									type="email" name="email" id="form1Example1"
									className="form-control" value={state.email}
									 disabled 
								/>
							</div>
			
							<div className="form-floating mb-4">
								<input
									type="name" name="name" id="form1Example2"
									className="form-control" value={state.name}
									onChange={handleChange}  required
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



