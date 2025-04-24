import express from "express";
// import cors from "cors"
import newServer from "http";
import { Server } from "socket.io";
const app = express();
// const socketServer=new newServer(app)
const httpServer = newServer.createServer(app);
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
let rightVotes = 0;
let leftVotes = 0;
const io = new Server(httpServer, { cors: { origin: "http://localhost:5173", credentials: true } });
io.on("connection", (socket) => {
    socket.emit("chat", "start the polling system successfully");
    socket.emit("votes", { rightVotes, leftVotes });
    console.log("server successfuly connected ");
    // socket.on("")
    socket.on("rightIncreament", () => {
        rightVotes++;
        io.emit("votes", { rightVotes, leftVotes });
    });
    socket.on("rightDecreament", () => {
        if (rightVotes > 0)
            rightVotes--;
        io.emit("votes", { rightVotes, leftVotes });
    });
    socket.on("leftIncreament", () => {
        leftVotes++;
        io.emit("votes", { rightVotes, leftVotes });
    });
    socket.on("leftDecreament", () => {
        if (leftVotes > 0)
            leftVotes--;
        io.emit("votes", { rightVotes, leftVotes });
    });
    socket.on("disconnect", () => {
        socket.emit("Successfully disconnected.", socket.id);
    });
});
const path = 8000;
httpServer.listen(path, () => console.log("server is listening to us"));
