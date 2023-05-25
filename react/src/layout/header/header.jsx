import React from 'react';
import styled from 'styled-components';
import { useLocation, Link } from "react-router-dom";
import cv_logo from '../../assets/cv_logo.png';
import Instagram from '../../assets/Instagram.png';
import Discord from '../../assets/Discord.png';
import "./header.css"


const Section = styled.div`
    display: flex;
    justify-content: center;
    background-color: rgba(198, 235, 255, 1);
`;

const Container = styled.div`
    width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
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

export default function Header() {
    const location = useLocation();

    return (
        <Section>
            <Container>
                <nav>
                    <div className='sections'>
                        <img src={cv_logo} alt = "cv logo" className='Logo'/>
                        <ul className='links'>
                            <li className={location.pathname === "/" ? "Home active" : "Home"}>
                                <Link to='/'>
                                    <h3>Home</h3>
                                </Link>
                            </li>
                            <li className={location.pathname === "/albums" ? "Album active" : "Album"}>
                                <Link to='/albums'>
                                    <h3>Album</h3>
                                </Link>
                            </li>
                            <li className={location.pathname === "/projects" ? "Project active" : "Project"}>
                                <Link to='/projects'>
                                    <h3>Projects</h3>
                                </Link>
                            </li>
                        </ul>
                        <a href="https://www.instagram.com/cv_asu/">
                            <img src={Instagram} alt = "Instagram" className='instagram'/>
                        </a>
                        <a href="https://discord.gg/KqE2Pah4yt">
                            <img src={Discord} alt='Discord' className='discord'/>
                        </a>
                        <Button className='button'>Join Our Club</Button>
                    </div>
                </nav>
            </Container>
        </Section>
    );
}