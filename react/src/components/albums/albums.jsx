import React from "react";
import styled from 'styled-components';
import projects from '../../assets/project.json'
import { Link } from 'react-router-dom';


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
  padding-bottom: 230px;
  margin-top: -50px;
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

const Right =  styled.div`
  flex: 5;
  position: relative;
  padding-bottom: 80px;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: -50px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #000;
  font-family: 'Poppins', sans-serif;
  width: 770px;
  color: rgba(0, 99, 178, 1);
`

const ProjectRow = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
  padding: 10px;
  border-bottom: 1px solid #000;
  font-family: 'Poppins', sans-serif;
  width: 770px;
  gap: 100px;

  p {
    min-width: 190px; 
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1); // Change this color to your preferred hover color
  }
`;

export default function albums() {

  return (
    <Section>
        <Container>
          <Left>
            <Title className="title">Albums</Title>
            <Desc className="desc">Record of our meetings.</Desc>
          </Left>
          <Right> 
            <HeaderRow>
              <h3>Title</h3>
              <h3>Summary</h3>
              <h3>Contributors</h3>
            </HeaderRow>
            {projects.map((project, index) => (
              <ProjectRow to="/project_detail" key={index}>
                <p>{project.title}</p>
                <p>{project.summary}</p>
                <p>{project.contributors}</p>
              </ProjectRow>
            ))}
          </Right>
        </Container>
    </Section>
  );
}