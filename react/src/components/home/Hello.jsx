import React from 'react';
import styled from 'styled-components';


const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
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
  flex: 1;
  position: relative;
`;

const Title =  styled.h1`
  font-size: 74px;  
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: rgba(0, 99, 178, 1);
  color: white;
  font-weight: 500;
  width: 120px;
  padding: 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.15s ease-in-out; 
  &:hover {
      transform: scale(1.05);
  }
`

const Desc =  styled.p`
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
`;

const Right =  styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;


export default function Hello() {
    return (
        <Section>
          <Container>
            <Left> 
              {/* Hello project */}
            </Left>
            <Right>
              <Title className="title">What we do</Title>
              <Desc className="desc">
                Hi!
                We are a group of highly motivated, passionate, and curios students from different backgrounds.
                This club provides a platform for students to connect, learn, and start or work on projects 
                particularly in the computer vision area as one of the applications for machine learning.
              </Desc>
              <Button>See our works</Button>
            </Right>
          </Container>
        </Section>
    );
}
