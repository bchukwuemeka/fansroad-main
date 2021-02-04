import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, NavLink } from "react-router-dom";
import FbImageLibrary from 'react-fb-image-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faHeart, faComment, faFunnelDollar, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Index from '../comment/Index';


const PostShow = ({ post} ) => {

	const current_user = JSON.parse(localStorage.getItem("current_user"))
	const [showComment, setShowComment] = useState(false)
	// const postComment = 
	const [commentCount, setCommentCount] = useState(post.commentsCount)
	const [likes, setLikes] = useState(post.likes)
	const [liked, setLiked] = useState(false)
	const [like, setLike] = useState({})
	const [color, setColor] = useState('no-color')

	
	const images = post.images.map(image =>image.url)

	const displayimages = () =>{
		return (
			<FbImageLibrary images={images} countFrom={2}/>
		)
	};

	const getPostLikes =  async() => {
		try {
					const res = await axios.get(`http://localhost:3000/api/v1/posts/${post.id}`,
					{ withCredentials: true });
				setLike(prevLike => ({...prevLike, ...checkUserLiked(res.data.getLikes)}))				
			} catch (err) {
					console.error(err); 
			}
	};

	const checkUserLiked = (arr) =>{
		const like2 = arr.find(function(e) { return e.user_id === current_user.id })
		return like2 === undefined ? {} : like2
	}

	const handleComment = () => {
		setShowComment(!showComment)
	}
	const handleLikes = async() =>{
		if(!liked){
			try {
					const res = await axios.post(`http://localhost:3000/api/v1/likes/`,
					{
						user_id: current_user.id,
						likeable_type: 'Post',
						likeable_id: post.id
					},
					{ withCredentials: true }
					);
					setLike(res.data)
					console.log('post like: ', like)
					setLiked(true)
					console.log('liked: ', liked)
					setLikes(likes + 1)
					setColor('b-blue')
			} catch (err) {
					console.error(err);
			}
		} else {
			try {
					axios.delete(`http://localhost:3000/api/v1/likes/${like.id}`);
					setLike({})
					setLiked(false)
					setLikes(likes - 1)
					setColor('no-color')
			} catch (err) {
					console.error(err);
			}
		}
	}


	useEffect(() =>{
		getPostLikes()
		setColor(prevColor => (prevColor === 'b-blue' ? 'no-colr' : 'b-blue'))
	}, [color])

	useEffect(() =>{
		console.log('use effect likes', like)
		if(like !== {}){
			setLiked(true)
			setColor('b-blue')
		}
	}, [like])


	const display = () => {
		return (
			<>
				<div className="post-header mb-3">
					<div className="image-username">
						<div className="float-left ">
							<img  src={post.user.image} />
						</div>		
						<div className="">
							<NavLink className="poster-name"  exact to={`user/${post.user.username}`}> {post.user.name} </NavLink>
							<NavLink className="poster-username"  exact to={`user/${post.user.username}`}> {`@${post.user.username}`} </NavLink>
						</div>
						<div className="clearfix"></div>
					</div>
					<div className="post-date">
						<div >
							<p>{post.created_at}</p>
						</div>
						<div className="dropdown post-dots ">	
								<a className='dots' type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<FontAwesomeIcon icon={faEllipsisH} size="2x" />
							</a>
							<div className="dropdown-menu post-dropdow dropdown-menu-right"
							aria-labelledby="dropdownMenuButton">
								<NavLink  className="dropdown-item"  exact to={`/posts/edit/${post.id}`}>
									EDIT POST 
								</NavLink>
								<a className="dropdown-item" href="#">Another action</a>
								<a className="dropdown-item" href="#">Something else here</a>
							</div>
						</div>
					</div>
					
				</div>
				<div className="clearfix"></div>
				
								
				<p> {post.description}</p>
				
				{ displayimages()}
				<div className="d-flex float-left post-icons post-comment mt-3">
					<FontAwesomeIcon className={color} onClick={handleLikes} icon={faHeart} size="2x" />
					<FontAwesomeIcon onClick={handleComment} icon={faComment} size="2x" />
				 <span> 	<FontAwesomeIcon className='tip-dollar' icon={faFunnelDollar} size="2x" />Send Tips</span>
				</div>
				<div className="float-right post-comment mt-3">
					<FontAwesomeIcon icon={faBookmark} size="2x" />
				</div>
				<div className="clearfix"></div>
				<div className="d-flex">
					<p className='mr-3'> <span className="mr-1">{likes}</span>likes</p>
					<p><span className="mr-1">{commentCount}</span>comments</p>
				</div>
				{ showComment ? <Index comments={post.comments} post={post}  /> : null}
			</>
		)
	}
	
	

    return (
			<div className="post-show mt-4 mb-5">
				{display()}
				
			</div>
    );
}

export default PostShow;