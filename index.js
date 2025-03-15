import express from "express"
import { Server } from "socket.io"
import bootStrap from "./src/app.controller.js"

const app= express()
const port=Number(process.env.PORT)

bootStrap(app,express)

const server = app.listen(port,()=> console.log(`app listening on port ${port} !`))

export const io = new Server(server, {
    cors: '*'
});


io.on("connection", (socket) => {
    
});
