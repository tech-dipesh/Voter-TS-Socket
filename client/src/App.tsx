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
    <main className="p-6 max-w-md mx-auto bg-red-50 rounded-lg shadow-md">
    <h2 className="text-xl font-bold text-center mb-4 bg-blue-500 text-white p-2 rounded">Upvote any listings:</h2>
    <p className="text-center p-2 mb-6 bg-blue-500 rounded">{chat}</p>
    
    <div className="space-y-8">
      <div className="space-y-8 flex flex-col items-center bg-blue-500 p-4 rounded-lg">
        <img className="h-24 w-24 mb-2" src={C} alt="C Logo" />
        <div className="text-lg font-semibold text-center mb-2">C Language</div>
        <div className="bg-red-400 px-4 py-2 rounded-full mb-4 text-center">
          Votes: {votes.rightVotes}
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => socket.emit("rightIncreament")} 
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            +1
          </button>
          <button 
            onClick={() => socket.emit("rightDecreament")} 
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            -1
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center bg-blue-500 p-4 rounded-lg">
        <img className="h-24 w-24 mb-2" src={Tailwind} alt="Tailwind CSS Logo" />
        <div className="text-lg font-semibold text-center mb-2">Tailwind CSS</div>
        <div className="bg-red-500 px-4 py-2 rounded-full mb-4 text-center">
          Votes: {votes.leftVotes}
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => socket.emit("leftIncreament")} 
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            +1
          </button>
          <button 
            onClick={() => socket.emit("leftDecreament")} 
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            -1
          </button>
        </div>
      </div>
    </div>
  </main>
  );
}

export default App;
