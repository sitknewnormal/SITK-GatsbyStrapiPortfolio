import React from "react"
// import socialLinks from "../constants/social_links"
import SocialLinks from "../components/SocialLinks"

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <div className="footer-links social-links">
          <SocialLinks isSideBar={false}/>
        </div>
        <h4>
          copyright&copy;{new Date().getFullYear()}
          <span>WebDev</span> all rights reserved
        </h4>
      </div>
    </footer>
  )
}

export default Footer
