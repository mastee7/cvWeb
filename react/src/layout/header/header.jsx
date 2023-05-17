import React from 'react';
import { useNavigate } from "react-router-dom";
import cv_logo from '../../assets/cv_logo.png';
import "./header.css"

export default function Header() {

    const navigate = useNavigate();

    // handling about
    const handleAbout = (event) => {
        navigate("/about");
    };

    //handling projects
    const handleProjects = (event) => {
        navigate("/projects");
    };


    return (
        <header>
            <img src={cv_logo} alt = "cv logo" />
            <nav>
                <div className='sections'>
                    <ul>
                        <li>
                            <a href='' onClick={handleAbout}>
                                <h3>About</h3>
                            </a>
                        </li>
                        <li>
                            <a href='' onClick={handleProjects}>
                                <h3>Projects</h3>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}