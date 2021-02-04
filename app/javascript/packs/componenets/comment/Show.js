import React, {useState, useEffect} from 'react';
import { useHistory, NavLink } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons';


const Show = ({ comment, setReload } ) => {
	const [user, setUser] = useState({})
	
	
	const current_user = JSON.parse(localStorage.getItem("current_user"))
	

	const getUser = async () => {
			try {
					const res = await axios.get(`http://localhost:3000/api/v1/user/${comment.user_id}`);
					setUser(res.data)
			} catch (err) {
					console.error(err);
			}
	};
	console.log(user)

	const handleClick = () => {
		try {
					axios.delete(`http://localhost:3000/api/v1/comments/${comment.id}`);
					setReload(true)
			} catch (err) {
					console.error(err);
			}
	}
	


	useEffect(() => {
		getUser()
  }, [])

		return (
			<>	
				<div className='comment-display d-flex mb-2 p-2'>
					<NavLink className=""  exact to={`user/${user.username}`}> 
						<img src={user.image} />
					 </NavLink>
					 <div className="d-block comment-delete">
						 <p> {comment.content}</p>
						 <span>{comment.created_at}</span> 
						 {
							 current_user.email === user.email &&
							 <a className='ml-4' onClick={handleClick}>
								 Delete
						 </a>
						 }
						 {/* <button type="button" class="btn btn-info btn-lg" >Open Modal</button> */}
					 </div>
					<FontAwesomeIcon  className='like-comment ' icon={faHeart} size="1x" />
				</div>
				
			</>
				
		)
}

export default Show;