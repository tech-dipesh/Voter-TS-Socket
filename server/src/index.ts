import express  from "express";
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

const io=new Server(httpServer, {cors: {origin: "http://localhost:5173", credentials: true }})
io.on("connection", (socket)=>{
  socket.emit("chat", "start the polling system successfully");
  console.log("server successfuly connected ");
  // socket.on("")
  
  socket.on("disconnected", ()=>{
    socket.emit("Successfully disconnected.")
  })
})


const path=8000;
httpServer.listen(path, ()=>console.log("server is listening to us"))
