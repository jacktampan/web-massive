import React, { useState } from 'react';
import Logoimg from '../assets/logo.png';
const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const links = [
        { name: 'Home', href: '#' },
        { name: 'Services', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Masuk/Daftar', href: '#', isButton: true }
    ];

    return (
        <nav className="bg-white dark:bg-zinc-800 container mx-auto">
                <div className="flex justify-around">
                    <div className="flex items-center py-5 px-2">
                        <a href="#">
                            <img src={Logoimg} alt="Logo" className="h-36"/>
                        </a>
                    </div>
                    <div className="hidden md:flex items-center space-x-1">
                        {links.slice(0, 3).map(link => (
                            <a key={link.name} href={link.href} className="py-5 px-3 text-zinc-700 dark:text-white hover:text-zinc-900 dark:hover:text-white">{link.name}</a>
                        ))}
                        <a href={links[3].href} className="py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-600">Masuk/Daftar</a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            className="mobile-menu-button"
                            onClick={toggleMenu}
                            aria-label="Toggle mobile menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <svg className="w-6 h-6 text-zinc-500 dark:text-white hover:text-zinc-900 dark:hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            <div id="mobile-menu" className={`mobile-menu md:hidden ${isMenuOpen ? '' : 'hidden'}`}>
                {links.slice(0, 3).map(link => (
                    <a key={link.name} href={link.href} className="block py-2 px-4 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700">{link.name}</a>
                ))}
                <a href={links[3].href} className="block py-2 px-4 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Masuk/Daftar</a>
            </div>
        </nav>
    );
};

export default NavBar;
