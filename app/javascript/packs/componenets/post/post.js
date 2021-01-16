import React, {useEffect, useState} from 'react';
import { useHistory, NavLink } from "react-router-dom";
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
	
	
	const [state, setState] = useState({
		description: '',
		featured_image: null,
		message: ''
	});
	
	const handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		setState({
			...state, [name]: value 
		});
	}
	
	const onImageChange = event => { 
		setState({ featured_image: event.target.files[0] });
		console.log('image: ', event.target.files)
	};
	const handleSubmit = async event => {
		event.preventDefault();
		const endpoint = `/api/v1/posts`;
		const formData = new FormData();
    formData.append('description', state.description);
    formData.append('featured_image', state.featured_image);
		try {
					const res = await axios.post( endpoint,
					formData
					,
						{ withCredentials: true })
						setState({...state, message: 'Post created'})
						console.log('post: ', res)				
				}catch(error)  {
					setState({...state, message: `${error}`})
					console.log("error", error);
			}
	}	
	
	const displayImage = () =>{
		if(state.featured_image){
			return <img src={featured_image}/>
		}
	}
	useEffect(() => {
		displayImage()
  }, [])

		return (
			<>	
				<span className='notice'>{state.message}</span>
				<div className=" pt-1 postDiv">
					{displayImage}
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
								onChange={handleChange} placeholder="description" 
							>
							</textarea>
						 </div>	
						
						<button type="submit" className="btn btn-primary ">Post</button>

					</form>
					<br />
			
      </div>
			</>
				
		)
}

export default Post;



