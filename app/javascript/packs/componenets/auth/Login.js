import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GETCURRENTUSER, LOGGEDINSTATUS } from '../../action/type'
import FacebookAuth from './facebook_auth';
import GoogleAuth from './google_auth';

const Login = ( ) => {
	const [state, setState] = useState({
     email:'',
     password: ''
  });
	
	
	const history = useHistory();
	const dispatch = useDispatch();
	const handleChange = (event) => {
		const name = event.target.name
		const value = event.target.value
		console.log(value)
    setState({
			...state, [name]: value 
    });
  }

	const handleRegister = () => {
		history.push("/register");
	}
  const handleSubmit = (event) => {
    const { email, password } = state;
		event.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/v1/sessions",
        
          {
            email: email,
            password: password
          },
        { withCredentials: true }
      )
      .then(response => {
					localStorage.setItem("current_user", JSON.stringify(response.data.data['user']));
					history.push("/");
					console.log("user logged in successful", response)
					setState({ ...state, email: '', password: ''})  
      })
      .catch(error => {
        console.log("registration error", error);
      });
    
  }

    return (
      <div className="container-fluid m-5 row loginDiv">
				<div className="col-md-8"></div>
				<div className="col-md-4  loginForm ">
					<FacebookAuth />
					<br />
					<GoogleAuth />
					<form onSubmit={handleSubmit}>
								
						<div className="form-floating mb-4">
							<input
								type="email" name="email" id="form1Example1"
								className="form-control" value={state.email}
								onChange={handleChange} placeholder="name@example.com" required 
							/>
						 </div>
    
 	 					<div className="form-floating mb-4">
							<input
								type="password" name="password" id="form1Example2"
								className="form-control" value={state.password}
								onChange={handleChange} placeholder="password" required
							/>
						 </div>	
						
						<button type="submit" className="btn btn-primary btn-block">Login</button>

					</form>
					<br />
					<p>Don't have an account yet?</p>
					<a onClick={handleRegister} className="text-primary ">Sign Up Here</a>

				</div>
      </div>
    );
}

export default Login;