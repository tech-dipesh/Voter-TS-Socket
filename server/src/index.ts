import { error } from "console";
import express, { response }  from "express";
// import cors from "cors"
import newServer from "http"
import { Server} from "socket.io"

const app=express()
// const socketServer=new newServer(app)
const httpServer=newServer.createServer(app)
// const httpServer=socketServer.create(socket)
// const cors= httpServer, {
//   origin: "http://localhost:5173",
//   credentials: true
// })
// app.use(cors())

// const cors={
//   origin: "http://localhost:5173",
//   Credential: true
// }

// interface rightSide{
//   rightOperation:()=>void
// }

let rightVotes: number=0;

interface leftSide{
  leftOperation:()=>void
}
let rightOperation: number=0
let leftOperation: number=0

const io=new Server(httpServer, {cors: {origin: "http://localhost:5173", credentials: true }})
io.on("connection", (socket)=>{
  socket.emit("chat", "start the polling system successfully");
  console.log("server successfuly connected ");
  
  // socket.on("")
  socket.on("voteRight", ()=>{
    rightOperation+=1;
    io.emit("rightUpdate", rightVotes)
  })

  // function rightI(rightOperation: rightSide){
  //   rightOperation+=1;
  //   io.emit("rightI", rightOperation)
  // }
  function rightD(rightOperation: rightSide){
    if(rightOperation==0){
      throw new Error("You can't decrease less thajn 0")
    }
    rightOperation-=1;
    socket.on("rightD", rightOperation)
  }
  function leftI(leftOperation: leftSide){
    leftOperation+=1;
    socket.on("leftI", leftOperation)
  }
  function leftD(leftOperation: leftSide){
    if(leftOperation==0){
      throw new Error("You can't decrease less than 0, on left side")
    }
    leftOperation-=1;
    socket.on("leftD", leftOperation)
  }

  socket.on("disconnected", ()=>{
    socket.emit("Successfully disconnected.")
  })
})


const path=8000;
httpServer.listen(path, ()=>console.log("server is listening to us"))
