import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./Components/JoinGame";

function App() {
  const api_key = "m9nzp2vkx74b";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }

  return (
    
   
    <div className='mainDiv'>
   <h1 className='mainTitle'>TIC-TAC-TOE</h1>
  
    
    {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <div className="logOut">
          <button className="btn btn-dark" onClick={logOut}> Log Out</button>
          </div>
        </Chat>
      ) : (
        <>
    <div className="container">
    <SignUp setIsAuth={setIsAuth}/>
    <Login setIsAuth={setIsAuth} />
    </div>
    </>
    )}
    
    </div>
   
    
      
  );
}

export default App;
