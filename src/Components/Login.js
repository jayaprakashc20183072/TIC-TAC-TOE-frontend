import React,{useState} from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";
function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const login = () => {
    Axios.post("https://tic-tac-toe-api-4cpa.onrender.com/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  }
    return (
   <div className="myContainer two">
  <h2 className='subTitle'>Login</h2>
  
    
      <div className="card">
        <div className="card-body">
          
            <div className="form-group">
              <label>Username</label>
              <input placeholder='Username' onChange={(event)=>setUsername(event.target.value)} type="text" className="form-control" name="username" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input placeholder='Password' onChange={(event)=>setPassword(event.target.value)} type="password" className="form-control" name="password" />
            </div>
            <button onClick={login} type="submit" className="btn btn-dark">Login</button>
         
        
      </div>
    </div>
  
</div>); 
}

export default Login;