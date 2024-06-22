import React from "react";

// Import images
import bcaIcon from "../assets/bca.png";
import bniIcon from "../assets/bni.png";
import mandiriIcon from "../assets/mandiri.png";
import heroImage from "../assets/hero-image.png";
import facebookIcon from "../assets/facebook-logo.png";
import twitterIcon from "../assets/twitter-icon.png";
import instagramIcon from "../assets/instagram-icon.png";
import linkedinIcon from "../assets/likedin-icon.png";
import youtubeIcon from "../assets/youtube-icon.png";
import logo from "../assets/logo.png";
// Main component
const FooterComponent = () => {
  return (
    <div className="bg-custom-footer text-white mt-8 p-4">
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-x-8 lg:space-y-0">
        <ContactAndPayment />
        <HeroImage />
        <FollowUs />
      </div>
      <p className="text-center text-sm mt-4">© 2024 KostCozy</p>
    </div>
  );
};

// Sub-component for Contact and Payment Information
const ContactAndPayment = () => {
  return (
    <div className="flex items-center flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
      <div>
        <img src={logo} alt="Logo" className="w-20 h-auto mb-2" />
        <p>Dapatkan info kost murah hanya di KostCozy</p>
        <p>Hubungi 0884-3877-3836</p>
        <div className="mt-4">
          <p className="font-bold mb-1">Payment Methods</p>
          <div className="flex space-x-2">
            <img src={bcaIcon} alt="BCA" className="w-10 h-10" />
            <img src={bniIcon} alt="BNI" className="w-10 h-10" />
            <img src={mandiriIcon} alt="Mandiri" className="w-10 h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Hero Image
const HeroImage = () => {
  return (
    <div>
      <img src={heroImage} alt="Hero Image" className="w-auto	" />
    </div>
  );
};

// Sub-component for Follow Us Section
const FollowUs = () => {
  const socialLinks = [
    { name: "Facebook", icon: facebookIcon },
    { name: "Twitter", icon: twitterIcon },
    { name: "Instagram", icon: instagramIcon },
    { name: "LinkedIn", icon: linkedinIcon },
    { name: "YouTube", icon: youtubeIcon },
  ];

  return (
    <div>
      <p className="font-bold mb-1">Follow us</p>
      <ul className="space-y-2">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href="#" className="flex items-center space-x-2">
              <img src={link.icon} alt={link.name} className="w-6 h-6 mr-2" />
              <span>{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterComponent;
