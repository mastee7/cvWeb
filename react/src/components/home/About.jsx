import React from "react";
import styled, { keyframes, css } from 'styled-components';
import Webcam from 'react-webcam';
import "./About.css"

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(198, 235, 255, 1);
`;

const Container =  styled.div`
  height: 100vh;
  width: 1400px;
  display: flex;
  scroll-snap-align: center;
  justify-content: space-between;
`;

const Left =  styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-bottom: 120px;
  margin-top: -70px;
`;

const Title =  styled.h1`
  font-size: 74px;  
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
`;

const Desc =  styled.p`
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
`;

const StyledWebcam = styled(Webcam)`
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 90%;
  height: 50%;
`;

const Right =  styled.div`
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
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: transform 0.1s ease-in-out; 
  animation: ${props => props.isWebcamOn ? 'none' : css`${blink} 1.5s infinite, ${pulse} 3s infinite`};
  position: relative;

  &:before {
    content: ${props => props.isWebcamOn ? '""' : '"Click Me"'};
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(0, 99, 178, 1);
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
    opacity: 0.8;
  }

  &:hover {
    transform: scale(1.05);
  }
`;


export default function About() {
  const webcamRef = React.useRef(null);
  const [isWebcamOn, setIsWebcamOn] = React.useState(true);

  const toggleWebcam = () => {
    setIsWebcamOn(!isWebcamOn);
  };
  

  return(
    <Section>
        <Container>
          <Left>
            <Title className="title">Computer Vision Club at ASU</Title>
            <Desc className="desc">We ignite passion, enhance skills, and pioneer the future of computer vision technology.</Desc>
          </Left>
          <Right> 
            {isWebcamOn && <StyledWebcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />}
            <Button onClick={toggleWebcam} isWebcamOn={isWebcamOn}>
              {isWebcamOn ? 'Stop Webcam' : 'Say Hi! 👋'}
            </Button>
          </Right>
        </Container>
    </Section>
  );
}