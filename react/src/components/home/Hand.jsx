import React, { useRef, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";

function HandGestureRecognition() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const checkForkGesture = (landmarks) => {
    // Helper function to calculate Euclidean distance
    const euclideanDistance = (a, b) => {
      return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2));
    }

    // Compute distances between specific sets of landmarks.
    const thumbDist = euclideanDistance(landmarks[3], landmarks[4]);
    const indexDist = euclideanDistance(landmarks[5], landmarks[8]);
    const middleDist = euclideanDistance(landmarks[9], landmarks[12]);
    const ringDist = euclideanDistance(landmarks[13], landmarks[16]);
    const pinkyDist = euclideanDistance(landmarks[17], landmarks[20]);

    // Check if the thumb and pinky are bent and the other fingers are extended
    return thumbDist < 0.2 && pinkyDist < 0.2 && indexDist > 0.2 && middleDist > 0.2 && ringDist > 0.2;
  }

  useEffect(() => {
    // Load the Handpose model
    handpose.load().then(model => {
      if (videoRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        video.addEventListener("play", () => {
          // Run handpose detection every animation frame
          const interval = setInterval(async () => {
            if (video.paused || video.ended) {
              clearInterval(interval);
              return;
            }

            // Run handpose model on the video frame
            const predictions = await model.estimateHands(video);

            if (predictions.length > 0) {
              // Do something with the predictions...
              for (let i = 0; i < predictions.length; i++) {
                const landmarks = predictions[i].landmarks;

                // Drawing keypoints on the canvas
                for (let i = 0; i < landmarks.length; i++) {
                  const x = landmarks[i][0];
                  const y = landmarks[i][1];

                  context.beginPath();
                  context.arc(x, y, 4, 0, 2 * Math.PI);
                  context.fillStyle = "aqua";
                  context.fill();
                }

                if (checkForkGesture(landmarks)) {
                  // Fork gesture detected
                  console.log("Fork gesture detected");
                  // You can implement additional actions here
                }
              }
            }
          }, 1000 / video.playbackRate);
        });
      }
    });
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline controls muted>
        <source src="your_video_source" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} />
    </div>
  );
}

export default HandGestureRecognition;
