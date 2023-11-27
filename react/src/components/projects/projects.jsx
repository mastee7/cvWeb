import React from "react";
import styled from 'styled-components';
import projects from '../../assets/project.json'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import ProjectUploadModal from './ProjectUploadModal';

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

const Button = styled.button`
    width: 140px;
    height: 40px;
    padding: 10px;
    background-color: rgba(0, 99, 178, 1);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 15px;
    cursor: pointer;
    color: white;
    transition: transform 0.15s ease-in-out; 
    &:hover {
        transform: scale(1.05);
    }
`;


export default function Projects() {
  const { isAuthenticated, token } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  // Dummy function to simulate user login state
  // You should replace this with your actual authentication logic
  const checkUserLoggedIn = () => {
    // Assume we have a function that checks the auth state
    const loggedIn = true; // Replace with actual check
    setIsUserLoggedIn(loggedIn);
  };

  useEffect(() => {
    // If you need to verify the token on component mount, do it here
  }, [token]); // 'token' should be from your AuthContext

  const handleAddProjectClick = () => {
    // Open the modal
    setShowModal(true);
  };

  return (
    <Section>
        <Container>
          <Left>
            <Title className="title">Projects</Title>
            <Desc className="desc">Over the time, our members build computer vision projects that help them enrich their skill and experience.</Desc>
            {isAuthenticated && <Button onClick={handleAddProjectClick}>Add Project</Button>}
            {showModal && <ProjectUploadModal onClose={() => setShowModal(false)} />}
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