import React from 'react';
import styled from 'styled-components';
import Footer from '../../layout/footer/footer';

const Section = styled.div`
  height: 100vh;
  background-color: rgba(198, 235, 255, 1);
  scroll-snap-align: center;
`

export default function Contact() {
    return (
        <Section>
            <div>
                Contact
            </div>
            <Footer/>
        </Section>
    );
}