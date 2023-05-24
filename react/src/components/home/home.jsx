import React from "react";
import styled from "styled-components";
import Hello from './Hello'
import Contact from './Contact'
import About from './About'

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-padding-top: 10vh;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  &webkit-scrollbar{
    display: none;
  }
`;

export default function Home() {
  return (
    <Container>
        <About/>
        <Hello/>
        <Contact/> 
    </Container>
  );
}