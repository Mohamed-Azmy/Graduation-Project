import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import bootStrap from "./src/app.controller.js";

const app = express();
const server = createServer(app);

bootStrap(app, express);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Vercel API handler
export default function handler(req, res) {
  res.status(200).json({ message: "Server is running!" });
}

export { server, io };
