import React, {useState, useEffect} from 'react';
import { useHistory, NavLink } from "react-router-dom";
import FbImageLibrary from 'react-fb-image-grid'

const PostShow = ({ post} ) => {
	const images = post.images

	const displayimages = () =>{
		return (
			<FbImageLibrary images={images} countFrom={3}/>
		)
	}
	
	// var images = post.images.map(function(image, i) {

	// 	return (<img key={i} src={image}  />);
	// });

    return (
			<div className="post-show mt-4">
				<div className="post-header mb-3">
					<div className="image-username">
						<div className="float-left ">
							<img  src={post.user.image} />
						</div>		
						<div className="">
							<NavLink className="poster-name"  exact to={`/${post.user.username}`}> {post.user.name} </NavLink>
							<NavLink className="poster-username"  exact to={`/${post.user.username}`}> {`@${post.user.username}`} </NavLink>
						</div>
						<div className="clearfix"></div>
					</div>
					
					<div className="post-date">
						<p> {post.created_at}</p>
					</div>
				</div>
				<div className="clearfix"></div>
				
				<p> {post.description}</p>
				
				{ displayimages()}
				{/* <div className="post-show-images">
					
				</div> */}
			</div>
    );
}

export default PostShow;