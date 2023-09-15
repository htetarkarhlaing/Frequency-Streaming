/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Select, SelectItem } from "@nextui-org/react";

const resolutionList = [{
    label: "1920x1080",
    value: "1920x1080"
},
{
    label: "1280x720",
    value: "1280x720"
},
{
    label: "640x480",
    value: "1280x720"
},]

const Broadcast = () => {
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [isSharing, setIsSharing] = useState(false);
    const [selectedResolution, setSelectedResolution] = useState("1280x720")
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const startSharing = async () => {
        try {
            const screenStream: MediaStream =
                await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        width: { ideal: parseInt(selectedResolution.split("x")[0]) },
                        height: { ideal: parseInt(selectedResolution.split("x")[1]) },
                    },
                    audio: true
                });

            const audioStream: MediaStream =
                await navigator.mediaDevices.getUserMedia({ audio: true });

            const combinedStream = new MediaStream();
            screenStream
                .getTracks()
                .forEach((track) => combinedStream.addTrack(track));
            audioStream
                .getTracks()
                .forEach((track) => combinedStream.addTrack(track));

            if (videoRef && videoRef.current) {
                videoRef.current.srcObject = combinedStream;
            }

            // Set screenStream and audioStream in state
            setScreenStream(screenStream);
            setAudioStream(audioStream);
            setIsSharing(true);
        } catch (error) {
            console.error("Error starting screen sharing:", error);
        }
    };

    const stopSharing = () => {
        // Stop screen and audio streams
        if (screenStream) {
            screenStream.getTracks().forEach((track) => track.stop());
        }
        if (audioStream) {
            audioStream.getTracks().forEach((track) => track.stop());
        }

        // Clear the video element source
        if (videoRef && videoRef.current) {
            videoRef.current.srcObject = null;
        }
        // Reset state
        setScreenStream(null);
        setAudioStream(null);
        setIsSharing(false);
    };

    const resolutionChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedResolution(e.target.value)
    }

    useEffect(() => {
        async function fetchDevices() {
            try {
                const deviceInfos = await navigator.mediaDevices.enumerateDevices();
                console.log(deviceInfos);
                setDevices(deviceInfos);
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        }

        fetchDevices();
    }, []);

    useEffect(() => {
        // Perform cleanup when the component unmounts
        return () => {
            stopSharing();
        };
    }, []);

    return (
        <div className="w-screen h-screen flex space-x-2">
            <video ref={videoRef} autoPlay muted playsInline className="fixed w-full h-full z-0 blur-3xl" />
            <div className="w-full aspect-video overflow-hidden z-10">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full aspect-video rounded-lg border"
                />
            </div>

            <div className="w-[300px] h-full z-10">
                <Select
                    label="Audio Input"
                    placeholder="Select Audio Input"
                    className="max-w-xs"
                >
                    {devices
                        .filter((dev) => dev.kind === "audioinput")
                        .map((device, key) => (
                            <SelectItem key={key} value={device.deviceId}>
                                {device.label || `Audio Input ${key + 1}`}
                            </SelectItem>
                        ))}
                </Select>

                <Select
                    label="Video Input"
                    placeholder="Select Video Input"
                    className="max-w-xs"
                >
                    {devices
                        .filter((dev) => dev.kind === "videoinput")
                        .map((device, key) => (
                            <SelectItem key={key} value={device.deviceId}>
                                {device.label || `Video Input ${key + 1}`}
                            </SelectItem>
                        ))}
                </Select>

                <Select
                    label="Resolution"
                    placeholder="Select Video Resolution"
                    className="max-w-xs"
                    onChange={resolutionChangeHandler}
                >
                    {resolutionList
                        .map((res, key) => (
                            <SelectItem key={key} value={res.value}>
                                {res.label}
                            </SelectItem>
                        ))}
                </Select>

                {!isSharing ? (
                    <button onClick={startSharing}>Start Sharing</button>
                ) : (
                    <button onClick={stopSharing}>Stop Sharing</button>
                )}
            </div>
        </div>
    );
};

export default Broadcast;
