import axios from 'axios';

export  const logInWithProvider = async (provider, response) => {
  const endpoint = `http://localhost:3000/api/v1/omniauth/${provider}/callback`
				try {
					const res = await axios.post( endpoint, response, { withCredentials: true })
					localStorage.setItem("current_user", JSON.stringify(res.data.data['user']));
					console.log("you  ok", res)
				
				}catch(error)  {
        console.log("registration error", error);
      }			
	
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