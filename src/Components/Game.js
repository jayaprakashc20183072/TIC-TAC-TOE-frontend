import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
function Game({ channel, setChannel }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div className="wait"> <p> Waiting for other player to join... </p></div>;
  }
  return (
    
    <div className="gameContainer">
    <div className="gameChat">
      <Board result={result} setResult={setResult} />
      <div className="leaveButton">
      <button className="btn btn-dark leave"
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      </div>
      </div>
      <div className="leaveGame">
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      </div>
      {result.state === "won" && <div className="result"> {result.winner} Won The Game 🥳</div>}
      {result.state === "tie" && <div> Game Tied</div>}
    </div>
  );
}

export default Game;