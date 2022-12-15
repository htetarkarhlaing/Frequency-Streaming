// importing required packages
import "dotenv/config";
import express from "express";
import cors from "cors";
//ENV
const PORT = process.env.PORT || 8000;

//express server instance
const app = express();
const httpServer = require("http").Server(app);

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "./../public"));

let broadcaster;
io.sockets.on("error", (e) => console.log(e));
io.sockets.on("connection", (socket) => {
	socket.on("broadcaster", () => {
		broadcaster = socket.id;
		socket.broadcast.emit("broadcaster");
	});
	socket.on("watcher", () => {
		socket.to(broadcaster).emit("watcher", socket.id);
	});
	socket.on("offer", (id, message) => {
		socket.to(id).emit("offer", socket.id, message);
	});
	socket.on("answer", (id, message) => {
		socket.to(id).emit("answer", socket.id, message);
	});
	socket.on("candidate", (id, message) => {
		socket.to(id).emit("candidate", socket.id, message);
	});
	socket.on("disconnect", () => {
		socket.to(broadcaster).emit("disconnectPeer", socket.id);
	});
});

httpServer.listen(PORT, () => {
	console.log("server is starting on port", PORT);
});
