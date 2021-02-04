import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import axios from 'axios';
import { NavLink, useParams } from "react-router-dom";
import FbImageLibrary from 'react-fb-image-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faHeart, faComment, faFunnelDollar, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Index from '../comment/Index';


const SinglePost = () => {

	const [showComment, setShowComment] = useState(true)
	const [post, setPost] = useState({})
	const [load, setLoad] = useState(true)
	const [commentCount, setCommentCount] = useState(post.commentsCount)
	const [likes, setLikes] = useState(post.likes)
	const initialRender = useRef(true);
	const {id} = useParams()
	let post1 = {}
	
	const getPosted = async () =>{
		try {
					const res = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
					setPost(res.data);
					setCommentCount(res.data.commentsCount)
					setLikes(res.data.likes)
					post1 = res.data
					setLoad(false)
				}catch(error)  {
					console.log("error", error);
			}
	}

	
	const displayimages = () =>{
		const images = post.images.map(image =>image.url)
		return (
			<FbImageLibrary images={images} countFrom={3}/>
		)
	}
	const handleComment = (e) => {
		console.log(e.target)
		setShowComment(!showComment)
	}
	const displayPost = () => {

		return (
			<>
			<div className="post-header mb-3 h-50">
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
				<FontAwesomeIcon icon={faHeart} size="2x" />
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
	useEffect(() => {
    getPosted()
		console.log('id: ', id)
		console.log('working ')
  }, [])

	return (
		<div className="post-show mt-4 mb-5 singlePost">
			{
				!load && displayPost()
			}
		</div>
	);
}

export default SinglePost;