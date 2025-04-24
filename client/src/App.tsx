import { useState, useEffect, useRef } from "react";
import "./App.css";
import { io } from "socket.io-client";
import C from "./assets/c.png"
import Tailwind from "./assets/tailwind.png"

function App() {
  // const [poll, setPoll] = useState<string>("");
  const [rightIncrease, setRightIncrease] = useState<number>(0);
  const [rightDecrease, setRightDecrease] = useState<number>(0);
  const [leftIncrease, setLeftIncrease] = useState<number>(0);
  const [leftDecrease, setLeftDecrease] = useState<number>(0);

  // const cors = new { origin: "localhost:3000", Credential: true }();

  const socket=io("http://localhost:8000")
io.on("connection", ()=>{
  console.log(socket.id);
})
socket.on("connect", ()=>{
  console.log("user successfully connected.");
  console.log(socket.id);
})
socket.on("disconnect", ()=>{
  console.log(socket.id);
  console.log("user successfully disconnected");
})

  let start=0;  
  useEffect(() => {
    socket.on("rightUpdate", setRightIncrease)
    socket.on("leftUpdate", setLeftIncrease)
    // try {
      // socket.on;
      // setPoll();
    //   socket.on("rightI", (rightOperation) =>setRightIncrease(rightOperation))
    //   return ()=>{socket.off("rightUpdate")}
    //   socket.on("rightD", (rightOperation)=>setRightDecrease(rightOperation))
    //   return ()=>{socket.off("rightUpdate")}
    //   socket.on("leftI", (leftOperation)=> setLeftIncrease(leftOperation))
    //   return ()=>{socket.off("rightUpdate")}
    //   socket.on("leftD", (leftOperation)=>setLeftDecrease(leftOperation))
    //   return ()=>{socket.off("rightUpdate")}

    // } catch (err) {
    //   setPoll(err);
    // }
    // socket.on("rightI", (count)=>setRightIncrease(count){
    socket.on("rightUpdate", setRightIncrease)

    })
  });

  // const poll = useRef<string>("");

  return (
    <>
      <h2 className="bg-blue-500 justify-center">Upvote any listings:</h2>

      <span>
        <div className="gap-3">
          <img src={C} alt="C Logo" />
          <span>
            <button onClick={()=>Socket.emit("voteLeft")}> {leftIncrease}: +1; className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
             {leftIncrease}: +1
            </button>
            <button className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              {leftDecrease}:-1
            </button>
          </span>
          <h2></h2>
        </div>
        <div className="gap-3">
          <img src={Tailwind} alt="Tailwind Css" />
          <span>
            <button className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              {rightIncrease}:+1
            </button>
            <button className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              {rightDecrease}:-1
            </button>
          </span>
        </div>
      </span>
    </>
  );
}

export default App;
