import React from "react";
import "./footer.css";

export default function Footer() {

  return (
    <footer style={{ display: "flex", alignItems: "center" }}>
      <p className="copy">&copy; {new Date().getFullYear()} Computer Vision Club at ASU</p>
    </footer>
  );
}