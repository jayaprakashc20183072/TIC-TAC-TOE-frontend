import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post("https://tic-tac-toe-api-4cpa.onrender.com/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };

    return (
        <div className="myContainer">
  <h2 className='subTitle'>Sign Up</h2>
    
      <div className="card">
        <div className="card-body">
          
          <div className="form-group">
              <label>First Name</label>
              <input placeholder='First Name' onChange={(event)=>setUser({...user,firstName:event.target.value})} type="text" className="form-control" name="username" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input placeholder='Last Name' onChange={(event)=>setUser({...user,lastName:event.target.value})} type="text" className="form-control" name="username" />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input placeholder='Username' onChange={(event)=>setUser({...user,username:event.target.value})} type="text" className="form-control" name="username" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input placeholder='Password' onChange={(event)=>setUser({...user,password:event.target.value})} type="password" className="form-control" name="password" />
            </div>
            <button onClick={signUp} type="submit" className="btn btn-dark">Sign Up</button>
         
      
      </div>
    </div>
  </div>);


    
}

export default SignUp;