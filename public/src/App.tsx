import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
import "./App.css";

function App() {
	// instances
	const serverURL = "http://localhost:8080";
	const socket = io(serverURL);
	const peer = new Peer();

	// state
	const [video, setVideo] = useState<MediaStream>();
	const videoRef = useRef<HTMLVideoElement>(null);
  const [peerConnections, setPeerConnections] = useState([])

	useEffect(() => {
		peer.on("open", (id) => {
			socket.emit("new-user", id);
		});
	}, []);

	useEffect(() => {
		socket.on("userJoined", (newUser) => {
			console.log(newUser);
		});
	}, [socket]);



	const handleStart = async () => {
		const videoSource = await window.navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		setVideo(videoSource);
	};

	return (
		<div className="App">
			<button onClick={handleStart}>Start</button>
			<video ref={videoRef}></video>
		</div>
	);
}

export default App;
