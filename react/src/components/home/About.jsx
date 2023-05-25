import React from "react";
import styled from 'styled-components';
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
  padding-bottom: 100px;
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
  padding-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function About() {
  const webcamRef = React.useRef(null);

  return(
    <Section>
        <Container>
          <Left>
            <Title className="title">Computer Vision Club at ASU</Title>
            <Desc className="desc">A club where we nurture passion, cultivate skills, and envision computer vision's future.</Desc>
          </Left>
          <Right> 
            <StyledWebcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </Right>
        </Container>
    </Section>
  );
}