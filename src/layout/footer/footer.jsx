import React from "react";
import "./footer.css";
import Insta from '../../assets/instagram.png';
import Discord from '../../assets/discord.png';

export default function Footer() {

  return (
    <footer style={{ display: "flex", alignItems: "center" }}>
      <p style={{ flex: 1 }}>&copy; {new Date().getFullYear()} Computer Vision Club at ASU</p>
      <a href="https://www.instagram.com/cv_asu/">
        <img src={Insta} alt="instagram" />
      </a>
      <a href="https://discord.gg/KqE2Pah4yt">
        <img src={Discord} alt="Discord" />
      </a>
    </footer>
  );
}