import React from 'react';

// Main component
const FooterComponent = () => {
  return (
    <div className="bg-zinc-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start space-y-4 lg:space-x-8 lg:space-y-0">
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
        <img src="https://placehold.co/100x50" alt="Logo" className="mb-2" />
        <p>Dapatkan info kost murah hanya di KostCozy</p>
        <p>Hubungi 0884-3877-3836</p>
        <div className="mt-4">
          <p className="font-bold mb-1">Payment Methods</p>
          <div className="flex space-x-2">
            <img src="https://placehold.co/40x25" alt="BCA" />
            <img src="https://placehold.co/40x25" alt="Bukalapak" />
            <img src="https://placehold.co/40x25" alt="BNI" />
            <img src="https://placehold.co/40x25" alt="Mandiri" />
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
      <img src="https://placehold.co/300x100" alt="Hero Image" className="rounded-lg shadow-lg" />
    </div>
  );
};

// Sub-component for Follow Us Section
const FollowUs = () => {
  const socialLinks = [
    { name: 'Facebook', icon: 'https://placehold.co/24x24' },
    { name: 'Twitter', icon: 'https://placehold.co/24x24' },
    { name: 'Instagram', icon: 'https://placehold.co/24x24' },
    { name: 'LinkedIn', icon: 'https://placehold.co/24x24' },
    { name: 'YouTube', icon: 'https://placehold.co/24x24' },
  ];

  return (
    <div>
      <p className="font-bold mb-1">Follow us</p>
      <ul>
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href="#" className="flex items-center space-x-2">
              <img src={link.icon} alt={link.name} className="mr-2" />
              <span>{link.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterComponent;
