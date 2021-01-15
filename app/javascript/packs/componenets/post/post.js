import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faPlusCircle, faComment, faUserCircle } from '@fortawesome/free-solid-svg-icons'
	

const Post = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInStatus = useSelector(state => state.loggedInStatus.payload);
	const current_user = JSON.parse(localStorage.getItem("current_user")) ? true : false
	
	const displayNav = () => {
		const [state, setState] = useState({
			description: '',
			featured_image: null
		});

		const handleChange = (event) => {
			const name = event.target.name
			const value = event.target.value
			setState({
				...state, [name]: value 
			});
		}

		if(current_user){
			return(
				
				<div className="col">
					Post Page
				</div>

			)
		}
	}

		return (
			<>
			{displayNav()}
				<div className="container-fluid m-5 row loginDiv">
				<div className="col-md-8"></div>
				<div className="col-md-4  loginForm ">
					<FacebookAuth />
					<br />
					<GoogleAuth />
					<form onSubmit={handleSubmit}>
								
						<div className="form-floating mb-4">
							<input
								type="file" accept="image/*" multiple={false}
								onChange={onImageChange} 
							/>
						 </div>
    
 	 					<div className="form-floating mb-4">
							<textarea
								type="password" name="description" id="form1Example2"
								className="form-control" value={state.description}
								onChange={handleChange} placeholder="description" required
							>
							</textarea>
						 </div>	
						
						<button type="submit" className="btn btn-primary btn-block">Post</button>

					</form>
					<br />
					<p>Don't have an account yet?</p>
					<a onClick={handleRegister} className="text-primary ">Sign Up Here</a>

				</div>
      </div>
			</>
				
		)
}

export default Post;



