import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { GoogleLogout } from 'react-google-login';
import PostShow from './postShow'


const PostIndex = ( ) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [posts, setPosts] = useState([]);

	const getposts = async () => {
			try {
					const res = await axios.get('http://localhost:3000/api/v1/posts');
					setPosts(res.data)
					console.log('posts: ', posts)
			} catch (err) {
					console.error(err);
			}
	};
	

	useEffect(() => {
		getposts()
  }, [])
  
	
	const displayPosts = posts.map((post, i) =>
  	<div className="" key={i}> 
			<PostShow post={post}  />
		</div>
	);

  
    return (
			<div className="">
				{/* {console.log(current_user)} */}
				{displayPosts}
			</div>
    );
}

export default PostIndex;