import { useState, useEffect, useRef } from "react";
import "./App.css";
import { socket } from "socket.io-client";

function App() {
  // const [poll, setPoll] = useState<string>("");
  const [rightIncrease, setRightIncrease] = useState<number>(0);
  const [rightDecreaes, setRightDecrease] = useState<number>(0);
  const [leftIncrease, setLeftIncrease] = useState<number>(0);
  const [leftDecreaes, setLeftDecrease] = useState<number>(0);

  const cors = new { origin: "localhost:3000", Credential: true }();

  let start=0;
  useEffect(() => {
    try {
      // socket.on;
      // setPoll();
      socket.on("rightI", setRightIncrease+=1)
      socket.on("rightD", setRightDecrease+=1)
      socket.on("leftI", setLeftIncrease+=1)
      socket.on("leftD", setLeftDecrease+=1)
    )
    } catch (err) {
      setPoll(err);
    }
  });

  const poll = useRef<string>("");

  return (
    <>
      <h2 className="bg-blue-500 justify-center">This is the list of p</h2>

      <span>
        <div className="gap-3">
          <span>
            <button className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
             {leftIncrease}: +1
            </button>
            <button className="bg-red-600 border left-3 top-3 border-blue-400 h-5 w-10">
              {leftDecrease}:-1
            </button>
          </span>
          <h2></h2>
        </div>
        <div className="gap-3">
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
