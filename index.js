import express from "express"
import { Server } from "socket.io"
import bootStrap from "./src/app.controller.js"

const app = express();

const port=Number(process.env.PORT)
// console.log(process.env.USER_EMAIL);
// console.log(process.env.USER_PASSWORD);



bootStrap(app,express)

const server = app.listen(port,()=> console.log(`app listening on port ${port} !`))

const io = new Server(server, {
    cors: '*'
});


io.on("connection", (socket) => {
    

});

export { io };
export default app;
