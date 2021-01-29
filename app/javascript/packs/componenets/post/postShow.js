import React, {useState, useEffect} from 'react';
import { useHistory, NavLink } from "react-router-dom";
import FbImageLibrary from 'react-fb-image-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';


const PostShow = ({ post} ) => {
	const images = post.images

	const displayimages = () =>{
		return (
			<FbImageLibrary images={images} countFrom={3}/>
		)
	}
	

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
						<div >
							<p>{post.created_at}</p>
						</div>
						<div class="dropdown post-dots ">	
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
				{/* <div className="post-show-images">
					
				</div> */}
			</div>
    );
}

export default PostShow;