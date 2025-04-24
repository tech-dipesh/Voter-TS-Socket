import { useState, useEffect} from "react";
import "./App.css";
import { io} from "socket.io-client";
import C from "./assets/c.png"
import Tailwind from "./assets/tailwind.png"

function App() {

  interface voteState{
    rightVotes: number,
    leftVotes: number
  }

  const [socket]=useState(()=>io("http://localhost:8000"))
  const [votes, setvotes] = useState<voteState>({
    rightVotes:0,
    leftVotes:0
  })

  const [chat, setchat] = useState("")

  useEffect(() => {
    socket.on("chat", (message: string) => {
      setchat(message);
    });
    return () => {
      socket.off("chat");
    };
  }, [socket]);


  useEffect(() => {
    const handleVotes = (data: voteState) => {
      setvotes(data);
    };
    socket.on("votes", handleVotes);
    return () => {
      socket.off("votes", handleVotes);
    };
  }, [socket]);


  return (
    <main className="p-4">
      <h2 className="bg-blue-500 justify-center">Upvote any listings:</h2>
      <h2 className="bg-blue-500 justify-center">{chat}</h2>

      <span>
        <div className="gap-3">
        <button className="bg-blue-300">{votes.rightVotes}</button>
          <span>
          <img className="justify-center  h-1/4 w-1/4" src={C} alt="C Logo" />
            <button onClick={()=>socket.emit("rightIncreament")} className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              +1
            </button>
            <button  onClick={()=>socket.emit("rightDecreament")} className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              -1
            </button>
          </span>
          <h2></h2>
        </div>
        <div className="gap-3">
            <button className="bg-blue-300">{votes.leftVotes}</button>
          <span>
          {/* <img className="h-1xl w-1xl" src={Tailwind} alt="Tailwind Css" /> */}
          <img className="justify-center  h-1/4 w-1/4" src={Tailwind} alt="C Logo" />

            <button onClick={()=>socket.emit("leftIncreament")} className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              +1
            </button>
            <button onClick={()=>socket.emit("leftDecreament")} className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              -1
            </button>
          </span>
        </div>
      </span>
    </main>
  );
}

export default App;
