import express  from "express";
import cors from "cors"
import newServer from "http"
import {Socket, io, socket} from "socket.io"

const app=express()
const socketServer=new newServer(app)
const httpServer=socketServer.create(Socket)

app.use(cors, httpServer, {
  origin: "http://localhost:5173",
  credentials: true
})

io.on("connection", ()=>{
  socket.emit("chat", "start the chat server");
  console.log("server successfuly connected ");
})

const path=8000;
httpServer.listen(path, ()=>console.log("server is listening to us"))
