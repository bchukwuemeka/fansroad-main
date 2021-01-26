import { GETCURRENTUSER, LOGGEDINSTATUS, GETPOSTS } from './type';

export const getCurrentUser = file => ({
	type: GETCURRENTUSER,
	payload: file
})

export const loggedInStatus = text => ({
	type: LOGGEDINSTATUS,
	payload: text
})


//  export const getposts = async () => {
//     try {
//         const resp = await axios.get('/api/v1/posts', newPost);
//         console.log(resp.data);
// 				return {
// 					type: GETPOSTS,
// 					payload: resp
// 				}
//     } catch (err) {
//         console.error(err);
//     }
// };
