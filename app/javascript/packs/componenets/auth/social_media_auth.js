import axios from 'axios';

export  const logInWithProvider = async (provider, response) => {
  const endpoint = `api/v1/omniauth/${provider}/callback`
		 
				try {
					const res = await axios.post( endpoint, response, { withCredentials: true })
					localStorage.setItem("current_user", JSON.stringify(res.data.data['user']));
					// localStorage.setItem("uid", response.headers["x-miniprofiler-ids"]);
					console.log("you  ", response)
				
				}catch(error)  {
        console.log("registration error", error);
      }			
		// await axios.post('http://localhost:5000/users/oauth/facebook', {
    //   access_token: data
    // });
	
}

// const sendPostRequest = async () => {
//     try {
//         const resp = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
//         console.log(resp.data);
//     } catch (err) {
//         // Handle Error Here
//         console.error(err);
//     }
// };