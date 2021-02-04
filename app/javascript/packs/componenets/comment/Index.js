import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import axios from 'axios';
import { GETCURRENTUSER, LOGGEDINSTATUS } from '../../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Show from './Show';
import Create from './Create';


const Index = ({ post } ) => {
	const dispatch = useDispatch();
	const addedComment = useSelector(state => state.comments)
	const [reload, setReload] = useState(false)
	const [disappear, setDisapper] = useState('')
	const [postComments, setPostComments] = useState([])
	console.log('re-rendering ',reload)
	
	const current_user = JSON.parse(localStorage.getItem("current_user"))
	
	
	const getComments = async() =>{
		const endpoint = `/api/v1/posts/${post.id}`;
		try {
					const res = await axios.get( endpoint,
						{ withCredentials: true })
						console.log('comments: ', res.data)
						setPostComments(res.data.comments);
						setReload(false)
						// setReload(false)
				}catch(error)  {
					console.log("error", error);
			}
	}
	// const [comments, setComment] = useState([])
	
	const displayComments = postComments.map((comment, i) =>
  	<div className="" key={i}> 
			<Show comment={comment} setReload={setReload}/>
		</div>
	);
	

	const handleClick = () => {
		setDisapper('disappear')
	}


	useEffect(() => {
		
		getComments()
		
  }, [reload])

	useEffect(() => {
		getComments()
  }, [])


		return (
			<div className='p-1'>	
				{displayComments}
				<NavLink className={`view-more-comments ${disappear}`} onClick={handleClick} 
				exact to={`/posts/show/${post.id}`}> 
						View more comments...
				</NavLink>
				<Create post={post} 
				setReload={setReload}
					 />
			</div>
				
		)
}

export default Index;