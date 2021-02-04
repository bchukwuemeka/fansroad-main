import React, {useEffect, useState} from 'react';
import { useHistory, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { GETCURRENTUSER, LOGGEDINSTATUS } from '../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faImage, faPlus, faLifeRing } from '@fortawesome/free-solid-svg-icons';

const EditPost = () => {
	const loggedInStatus = useSelector(state => state.loggedInStatus.payload);
	const current_user = JSON.parse(localStorage.getItem("current_user"))
	const {id} = useParams()
	
	const [state, setState] = useState({
		description: '',
		featured_image: [],
		images_url: [],
		message: ''
	});
	const [post, setPost] = useState({})
	// const images = post.images.map(image =>image.signed_id)

	const getPost = async () => {
		try {
					const res = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
					// const imagesObj = urlToObject(res.data.images)
					setState({description: res.data.description,
					featured_image: res.data.images.map(image =>image.signed_id),
					images_url: res.data.images})
					setPost(res.data)
			} catch (err) {
					console.error(err);
			}
	}
	useEffect(() => {
		getPost()
  }, [])

	
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
		console.log('files', files)
		for(let i =0; i<files.length; i++){
			console.log('files: ', files[i])
			console.log('urls: ', URL.createObjectURL(files[i]))
			setState({ 
			featured_image: [...state.featured_image, ...files],
			images_url: [...state.images_url,
			 URL.createObjectURL(files[i])]
		 });
		}
	};
	const handleSubmit = async event => {
		event.preventDefault();
		const endpoint = `/api/v1/posts/${post.id}`;
		const formD = new FormData();
    formD.append('description', state.description);
		formD.append('user_id', current_user.id);
		for(let i =0; i<state.featured_image.length; i++){
			formD.append('images[]', state.featured_image[i]);
		}
		
		console.log("formdata", formD)
		try {
					const res = await axios.patch(endpoint,
				formD
					,
						{ withCredentials: true })
						setState({...state, message: 'Post updated successfully'})
						console.log('post: ', res)
						setState({ description: '', featured_image: [], images_url: [], message: ''});
				}catch(error)  {
					setState({...state, message: `${error}`})
					console.log("error", error);
			}
	}	

	const removeImage = (image) =>{
		const images_url = state.images_url.filter(function(e) { return e !== image })
		// const featured_image = state.featured_image.splice(state.featured_image.indexOf(image), 1)

		const featured_image = state.featured_image.filter(function(e) { return e !== image.signed_id })
		console.log(image)
		setState({ images_url: images_url, featured_image: featured_image})
		console.log('images: ',state.featured_image)
	}
	
	const displayImage = state.images_url.map((image_url, i) =>
  	<li key={image_url.signed_id}> <img  src={image_url['url'] || image_url} width="100px" height="130px" />
			<span 
				 onClick={() => removeImage(image_url)}>
			 x</span> 
		</li>
	);
	const addButton = ( ) => {
	 return (	
  	<div  className="image-upload">
			<label className="plus-label" htmlFor="add-image">
					<FontAwesomeIcon icon={faPlus} size="2x" />
				</label>
			<input
				id="add-image"
				type="file" accept="image/*" multiple
				onChange={onImageChange} 
			/>
		</div>
	 )
	};


		return (
			<>	
				<span className='notice'>{state.message}</span>
				<div className=" pt-1 postDiv">
					<div className="post-name"> 
						<h4> <NavLink   exact to='/'><FontAwesomeIcon icon={faArrowLeft} size="1x" /> </NavLink> EDIT POST 
						</h4>
					</div>
					<ul className="d-flex preview-image">
								 { state.images_url.length > 0  && displayImage }
								 { state.images_url.length > 0 && addButton() }
					</ul>
					<form onSubmit={handleSubmit}  encType="multipart/form-data">
 	 					<div className="form-floating mb-4">
							<textarea
								type="password" name="description" id="form1Example2"
								className="form-control" value={state.description}
								onChange={handleChange} placeholder="Compose new post" rows="3"
							>	
							</textarea>
						 </div>
				
						 <div className="form-floating image-upload">
							  <label htmlFor="file-input">
									<FontAwesomeIcon icon={faImage} size="2x" />
								</label>
							<input
								id="file-input"
								type="file" accept="image/*" multiple={true}
								onChange={onImageChange} 
							/>
						 </div>	
						
						<button type="submit" className="btn btn-primary post-btn" 
						disabled={ !state.description && state.images_url.length <=0 }>
							EDIT
						</button>

					</form>
					<br />
			
      </div>
			</>
				
		)
}

export default EditPost;



