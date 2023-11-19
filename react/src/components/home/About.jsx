import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import Webcam from "react-webcam";
import arrow from "../../assets/arrow.png";
import lines from "../../assets/lines.png";
import "./About.css";
import {
  HandLandmarker,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(198, 235, 255, 1);
`;

const Container = styled.div`
  height: 100vh;
  width: 1400px;
  display: flex;
  scroll-snap-align: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-bottom: 120px;
  margin-top: -70px;
`;

const Title = styled.h1`
  font-size: 74px;
  font-family: "Poppins", sans-serif;
  font-weight: bold;
`;

const Desc = styled.p`
  font-size: 24px;
  font-family: "Poppins", sans-serif;
`;

const StyledWebcam = styled(Webcam)`
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  height: 50%;
`;

const Right = styled.div`
  flex: 3;
  position: relative;
  padding-bottom: 80px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: -50px;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const blink = keyframes`
  0% { opacity: 1; }
  30% { opacity: 0.6; }
  100% { opacity: 1; }
`;

const Button = styled.button`
  background-color: rgba(0, 99, 178, 1);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  animation: ${(props) =>
    props.isWebcamOn
      ? "none"
      : css`${blink} 1.5s infinite, ${pulse} 3s infinite`};
  position: relative;

  &:before {
    content: ${(props) =>
      props.isWebcamOn ? '""' : '"Click Me"'};
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(0, 99, 178, 1);
    font-size: 13px;
    font-family: "Poppins", sans-serif;
    opacity: 0.8;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const ScrollDownIndicator = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  bottom: 20px;
  opacity: ${(props) => props.opacity};
  transition: opacity 0.5s ease;
`;

const Arrow = styled.img`
  width: 50px;
  animation: ${bounce} 5s infinite;
  bottom: 20px;
`;

const ScrollText = styled.p`
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  color: rgba(0, 99, 178, 1);
`;

// For the fork detection
const FORK_THRESHOLD_DISTANCE = 0.07;

function calculateDistance(landmark1, landmark2) {
    let x1 = landmark1.x;
    let y1 = landmark1.y;
    let z1 = landmark1.z;
    let x2 = landmark2.x;
    let y2 = landmark2.y;
    let z2 = landmark2.z;
    return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2 + (z2 - z1)**2);
}

// To draw the box around the hand
function computeBoundingBox(landmarks, videoWidth, videoHeight) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const landmark of landmarks) {
    const x = landmark.x * videoWidth;
    const y = landmark.y * videoHeight;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

// For open palm detection
function detectOpenPalm(landmarks, isLeft) {
  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];

  let thumbCondition = false;
  
  if (isLeft) {
    thumbCondition = thumbTip.x < thumbIP.x;
  } else {
    thumbCondition = thumbTip.x > thumbIP.x;
  }

  return thumbCondition;
}


// For the fork detection
function detectFork(landmarks, isLeft) {
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const indexFingerTip = landmarks[8];
    const indexFingerPIP = landmarks[6];
    const middleFingerTip = landmarks[12];
    const middleFingerPIP = landmarks[10];
    const ringFingerTip = landmarks[16];
    const ringFingerPIP = landmarks[14];
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];

    const leftThumbCondition = (isLeft && thumbTip.x > thumbIP.x) || (!isLeft && thumbTip.x > thumbIP.x);
    const rightThumbCondition = (isLeft && thumbTip.x < thumbIP.x) || (!isLeft && thumbTip.x < thumbIP.x);

    if ((leftThumbCondition || rightThumbCondition) &&
        indexFingerTip.y < indexFingerPIP.y &&
        middleFingerTip.y < middleFingerPIP.y &&
        pinkyTip.y < pinkyPIP.y &&
        ringFingerTip.y > ringFingerPIP.y &&
        calculateDistance(thumbTip, ringFingerTip) < FORK_THRESHOLD_DISTANCE) {
        return true;
    }

    return false;
}


const About = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [isBottom, setIsBottom] = useState(false);
  const [runningMode, setRunningMode] = useState("VIDEO");
  const handLandmarker = useRef(null);

const toggleWebcam = () => {
  if (isWebcamOn) {
    // If the webcam is currently on, we want to turn it off
    // Stop the video stream
    if (webcamRef.current && webcamRef.current.stream) {
      console.log("Turning off webcam");
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
  } else {
    // If the webcam is off, turn it on
    if (webcamRef.current) {
      console.log("Turning on webcam");
      // TODO: Initialize or turn on the webcam here
    }
  }

  setIsWebcamOn(!isWebcamOn);
};


useEffect(() => {
  let isMounted = true;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const newOpacity = Math.max(Math.log10((200 - scrollPosition) / 50), 0);
    setOpacity(newOpacity);

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    handLandmarker.current = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
        delegate: "GPU"
      },
      runningMode: runningMode,
      numHands: 2
    });
  };

  if (webcamRef.current) {
      // Check if the webcam stream is available and start the webcam
      // TODO: Integrate your webcam starting logic here

      webcamRef.current.video.onloadeddata = () => {
          console.log("Starting prediction");
          if (isMounted) {
              predictWebcam();
          }
      };
  }

  createHandLandmarker();

  return () => {
    isMounted = false; 
    window.removeEventListener("scroll", handleScroll);
    // Cleanup logic for webcamRef's event listener
    if (webcamRef.current) {
      webcamRef.current.video.onloadeddata = null;
    }
  };
}, []);
  
  let lastVideoTime = -1;
  let results = undefined;
  async function predictWebcam() {
    console.log("The predict function is called")

    if (!handLandmarker.current || !webcamRef.current) {
      console.warn("Wait for handLandmarker to load and webcam to be ready.");
      return;
    }
  
    if (!canvasRef.current) return;
  
    // Ensure you're in "VIDEO" mode
    if (runningMode !== "VIDEO") {
      await handLandmarker.current.setOptions({ runningMode: "VIDEO" });
    }

    if (webcamRef.current) {
      const video = webcamRef.current.video;
    
      // Set the canvas size based on the video feed dimensions
      canvasRef.current.style.width = video.videoWidth + "px";
      canvasRef.current.style.height = video.videoHeight + "px";
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
    
      let startTimeMs = performance.now();
      if (lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        results = await handLandmarker.current.detectForVideo(video, startTimeMs);  // Ensure you handle the async call properly
      }
    }
  
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext("2d");

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      canvasCtx.font = '24px Arial'; // You can adjust the font size and style as per your need
      canvasCtx.textAlign = 'center';
      canvasCtx.fillStyle = '#FFFFFF'; // Color of the text
      canvasCtx.strokeStyle = '#000000'; // Stroke color for the text, to give it a bit of outline for better visibility
      canvasCtx.lineWidth = 4;

      
      const drawingUtility = new DrawingUtils(canvasCtx);
      const video = webcamRef.current.video;

      if (results.landmarks) {
        for (const landmarks of results.landmarks) {
          console.log(landmarks);          

          // Drawing the rectangle around the hand
          const boundingBox = computeBoundingBox(landmarks, video.videoWidth, video.videoHeight);
          canvasCtx.strokeStyle = '#00FFFF';  // Color for the bounding box
          canvasCtx.lineWidth = 2;  // Width of the bounding box line
          canvasCtx.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);

          const isLeft = results.handednesses && results.handednesses[0] && results.handednesses[0][0].label === 'Left';
    
          if (detectOpenPalm(landmarks, isLeft)) {
            console.log("Hello~!");
            const textPositionX = canvasRef.current.width - (boundingBox.x + (boundingBox.width / 2));
            const textPositionY = boundingBox.y - 10;

            canvasCtx.save();

            // Flip the canvas horizontally
            canvasCtx.translate(canvasRef.current.width, 0);
            canvasCtx.scale(-1, 1);

            canvasCtx.strokeText("Hello~! 👋", textPositionX, textPositionY);
            canvasCtx.fillText("Hello~! 👋", textPositionX, textPositionY);
            
            canvasCtx.restore();  
          }

          if (detectFork(landmarks, isLeft)) {
            console.log("Forks up!");
            const textPositionX = canvasRef.current.width - (boundingBox.x + (boundingBox.width / 2));
            const textPositionY = boundingBox.y - 10;

            canvasCtx.save();

            // Flip the canvas horizontally
            canvasCtx.translate(canvasRef.current.width, 0);
            canvasCtx.scale(-1, 1);

            canvasCtx.strokeText("Forks up! 🔱", textPositionX, textPositionY);
            canvasCtx.fillText("Forks up! 🔱", textPositionX, textPositionY);
            
            canvasCtx.restore();  
          }
    
          drawingUtility.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
            color: "#C6EBFF",
            lineWidth: 4
          });
          drawingUtility.drawLandmarks(landmarks, { color: "#007f8b", lineWidth: 1 });
        }
      }
    
      canvasCtx.restore();
    }
  
    if (isWebcamOn) {
      window.requestAnimationFrame(predictWebcam);
    }
  }

  return (
    <Section>
      <Container>
        <Left>
          <Title className="title">
            Computer Vision Club at ASU
          </Title>
          <Desc className="desc">
            We ignite passion, enhance skills, and pioneer the future of computer vision technology.
          </Desc>
        </Left>
        <Right>
          {isWebcamOn && (
            <>
              <StyledWebcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
              <canvas class="output_canvas" id="output_canvas" ref={canvasRef} style={{ position: 'absolute', top: 210, left: 100, zIndex: 1 }}></canvas>
            </>
          )}
          <Button onClick={toggleWebcam} isWebcamOn={isWebcamOn}>
            {isWebcamOn ? "Stop Webcam" : "Say Hi! 👋"}
          </Button>
        </Right>
      </Container>
      <ScrollDownIndicator opacity={opacity}>
        {isBottom ? (
          <>
            <Arrow src={lines} alt="end of page" />
          </>
        ) : (
          <>
            <Arrow src={arrow} alt="scroll down" />
            <ScrollText>Scroll down</ScrollText>
          </>
        )}
      </ScrollDownIndicator>
    </Section>
  );
};

export default About;