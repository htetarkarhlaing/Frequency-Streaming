// importing required packages
import "dotenv/config";
import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
const { ExpressPeerServer } = require("peer");
//ENV
const PORT = process.env.PORT || 8000;

//express server instance
const app = express();
const httpServer = require("http").Server(app);
const peer = ExpressPeerServer(httpServer, {
	debug: true,
});
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

//routes
app.use("/peer", peer);
app.set("view engine", "ejs");
app.use(express.static("www"));

app.get("/", (req, res) => {
	res.send(uuid());
});
app.get("/:room", (req, res) => {
	res.render("index", { RoomId: req.params.room });
});
io.on("connection", (socket) => {
	socket.on("newUser", (id, room) => {
		console.log(id, room);
		socket.join(room);
		socket.broadcast.emit("userJoined", id);
		socket.on("disconnect", () => {
			socket.broadcast.emit("userDisconnect", id);
		});
	});
});

httpServer.listen(PORT, () => {
	console.log("server is starting on port", PORT);
});
