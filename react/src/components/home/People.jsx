import React from 'react';
import styled from 'styled-components';
import memberData from '../../assets/clubMember.json'
import './People.css'

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(198, 235, 255, 1);
`;

const Container =  styled.div`
  height: 100vh;
  width: 1400px;
  display: flex;
  scroll-snap-align: center;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
  padding-bottom: 50px;
`;

const Title =  styled.h1`
  font-size: 74px;  
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  margin-bottom: -50px;
`;

const Left =  styled.div`
    flex: 1;
    position: relative;
    display: flex;
    align-items: center; 
    justify-content: center;
`;

const Right =  styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 35px 0px;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(80% - 10px);
  margin-bottom: 30px;

  img {
    border-radius: 50%;
    width: 128px;
    height: 128px;
  }

  a {
    color: black;
    text-decoration: none;
    text-align: center;
  }
`;

export default function People() {
    return (
        <Section>
            <Container>
                <Title className='title'>Members</Title>
                <ContentContainer>
                    <Left>
                        <Person>
                            <a href={memberData[7].linkedIn} target='_blank' rel='noreferrer'>
                                <img src={memberData[7].image} alt={memberData[7].name} />
                                <h4 className='name'>{memberData[7].name}</h4>
                                <p className='position'>{memberData[7].position}</p>
                            </a>
                        </Person>
                    </Left>
                    <Right>
                        <Row>
                            {memberData.slice(0, 3).map((person, index) => (
                                <Person key={index}>
                                <a href={person.linkedIn} target='_blank' rel='noreferrer'>
                                    <img src={person.image} alt={person.name} />
                                    <h4 className='name'>{person.name}</h4>
                                    <p className='position'>{person.position}</p>
                                </a>
                                </Person>
                            ))}
                        </Row>
                        <Row>
                            {memberData.slice(3, 6).map((person, index) => (
                                <Person key={index}>
                                <a href={person.linkedIn} target='_blank' rel='noreferrer'>
                                    <img src={person.image} alt={person.name} />
                                    <h4 className='name'>{person.name}</h4>
                                    <p className='position'>{person.position}</p>
                                </a>
                                </Person>
                            ))}
                        </Row>
                    </Right>
                </ContentContainer>
            </Container>
        </Section>
    );
}