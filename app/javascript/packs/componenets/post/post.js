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
	const current_user = JSON.parse(localStorage.getItem("current_user"))
	
	
	const [state, setState] = useState({
		description: '',
		featured_image: [],
		images_url: [],
		message: ''
	});
	
	const handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		setState({
			...state, [name]: value 
		});
			console.log('image: ', state.featured_image)
		console.log('url: ', state.images_url)
	}
	
	const onImageChange = e => { 
		const files = e.target.files
		setState({ featured_image: [...state.featured_image, ...files],
		 });
		for(let i =0; i<files.length; i++){
			console.log('files: ', files[i])
			console.log('urls: ', URL.createObjectURL(files[i]))
			setState({ featured_image: [...state.featured_image, files[i]],
			images_url: [...state.images_url,
			 URL.createObjectURL(files[i])]
		 });
		}
	};
	const handleSubmit = async event => {
		event.preventDefault();
		const endpoint = `/api/v1/posts`;
		const formData = new FormData();
    formData.append('description', state.description);
    formData.append('featured_image', state.featured_image);
		formData.append('user_id', current_user.id);
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
	
	// const displayImage = () =>{
	// 	if(state.images_url){
	// 		return <img src={state.images_url} width="100px" height="100px" />
	// 	}
	// }
	const displayImage = state.images_url.map((image_url) =>
  	<li key={image_url}> <img  src={image_url} width="100px" height="100px" /> </li>
	);
	useEffect(() => {
  }, [])

		return (
			<>	
				<span className='notice'>{state.message}</span>
				<div className=" pt-1 postDiv">
					<form onSubmit={handleSubmit}>
						<div className="form-floating mb-4">
							<ul className="d-flex preview-image">
								 {state.images_url.length > 0  && displayImage}
							</ul>
							<input
								type="file" accept="image/*" multiple
								onChange={onImageChange} 
							/>
						 </div>
    
 	 					<div className="form-floating mb-4">
							<textarea
								type="password" name="description" id="form1Example2"
								className="form-control" value={state.description}
								onChange={handleChange} placeholder="description" rows="5"
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



