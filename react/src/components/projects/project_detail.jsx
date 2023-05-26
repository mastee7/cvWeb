import React from 'react';
import styled from 'styled-components';

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
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding-bottom: 30px;  
`;

const Title =  styled.h1`
  font-size: 60px;  
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
`;

const Desc =  styled.p`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
`;

const Right =  styled.div`
  flex: 5;
  position: relative;
  padding-bottom: 80px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export default function project_detail() {
    return (
        <Section>
            <Container>
                <Left>
                    <Title className="title">Sign Language Detection</Title>
                    <Desc className="desc">Sign Language is a form of communication used primarily by people hard of hearing or deaf. This type of gesture-based language allows people to convey ideas and thoughts easily overcoming the barriers caused by difficulties from hearing issues.

A major issue with this convenient form of communication is the lack of knowledge of the language for the vast majority of the global population. Just as any other language, learning Sign Language takes much time and effort, discouraging to from being learned by the larger population.

However, an evident solution to this issue is present in the world of Machine Learning and Image Detection. Implementing predictive model technology to automatically classify Sign Language symbols can be used to create a form of real-time captioning for virtual conferences like Zoom meetings and other such things. This would greatly increase access of such services to those with hearing impairments as it would go hand-in-hand with voice-based captioning, creating a two-way communication system online for people with hearing issues.</Desc>
                </Left>
                <Right> 

                </Right>
            </Container>
        </Section>
    );
}