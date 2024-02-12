import React from "react";
import styled from "styled-components";
import Footer from "../../layout/footer/footer";
import Map from "./Map";
import "./Contact.css";

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
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: -200px;
`;

const Title = styled.h1`
  font-size: 55px;
  font-family: "Poppins", sans-serif;
  font-weight: 550;
  color: rgba(0, 99, 178, 1);
`;

const Input = styled.input`
  padding: 20px;
  border: none;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
`;

const Button = styled.button`
  background-color: rgba(0, 99, 178, 1);
  color: white;
  border: none;
  font-family: "Poppins", sans-serif;
  font-weight: semibold;
  cursor: pointer;
  border-radius: 10px;
  padding: 20px;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Section>
      <Container>
        <Left>
          <Form onSubmit={handleSubmit}>
            <Title>Contact Us</Title>
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <TextArea placeholder="Write your message here" rows={10} />
            <Button type="button">Submit</Button>
          </Form>
        </Left>
        <Right>
          <Map />
        </Right>
      </Container>
      <Footer />
    </Section>
  );
}
