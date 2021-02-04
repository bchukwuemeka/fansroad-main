import React, {useState, useEffect} from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GETCOMMENTS } from '../../action/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const Create = ({ post, setReload } ) => {
	const dispatch = useDispatch();
	const current_user = JSON.parse(localStorage.getItem("current_user"))
	
	
	const [content, setContent] = useState([])
	const [emoji, setEmoji] = useState([])
	let text = [];
	
	const handleChange = (event) => {
		// text += event.target.value 
		text.push(event.target.value)
		setContent(text)
		// setEmoji([])
		console.log(event.target.value)
	}
	

  const onEmojiClick = (event, emojiObject) => {
		event.preventDefault()
		// text += emojiObject.emoji + '  '
		// setContent(text )
		// setEmoji([...emoji, emojiObject.emoji])
		// text += emoji.join(' ')
		// const text1 = [...text, emojiObject.emoji]
		setContent([...content,emojiObject.emoji])
		console.log(text)
  };

	const handleClick = () => {
		setReload(true)
	}
	const handleSubmit = async event => {
		event.preventDefault();
		const endpoint = `/api/v1/comments`;
		const formData = new FormData();
    formData.append('content', content);
		formData.append('user_id', current_user.id);
		formData.append('post_id', post.id)
		
		try {
					const res = await axios.post( endpoint,
					formData
					,
						{ withCredentials: true })
						console.log('comment: ', res)
						setContent([]);
				}catch(error)  {
					console.log("error", error);
			}
	}	

	
	useEffect(() => {
  }, [])

		return (
			<>	
				<div className=" my-3 pt-4 px-4 comment-box">
					<div className='d-flex comment-tbox'>
						<div> <img src={post.user.image}/></div>
						<form onSubmit={handleSubmit} >
							<div className="form-floating mb-2">
								{/* <Picker onEmojiClick={onEmojiClick}  skinTone={SKIN_TONE_MEDIUM_DARK}
								
								/> */}
								<textarea
									type="text" name="content" id="form1Example2"
									className="form-control" value={content.join(' ')}
									onChange={handleChange} placeholder="Add comment" rows="2"
								>	
								</textarea>
							</div>
					
							<button type="submit" className=" comment-submit" 
							disabled={ content.length <1 } 
							onClick={handleClick}
							>
								<FontAwesomeIcon icon={faPaperPlane} size="2x" />
							</button>

						</form>
					</div>	
					<br />
			
      </div>
			</>
				
		)
}

export default Create;