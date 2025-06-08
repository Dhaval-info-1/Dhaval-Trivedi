import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Using Font Awesome icons

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-primary bg-opacity-90 border-b border-accent z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a className="text-3xl font-mono text-accent">DM<span className="text-text">.</span></a>
        </Link>

        {/* Hamburger Button - Visible on screens smaller than md */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-text hover:text-accent focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - Hidden on screens smaller than md */}
        <nav className="hidden md:flex md:items-center">
          <ul className="flex space-x-6 items-center">
            <li><Link href="/#about" legacyBehavior><a className="text-text hover:text-accent transition-colors">About</a></Link></li>
            <li><Link href="/#experience" legacyBehavior><a className="text-text hover:text-accent transition-colors">Experience</a></Link></li>
            <li><Link href="/blog" legacyBehavior><a className="text-text hover:text-accent transition-colors">Blog</a></Link></li>
            <li><Link href="/#contact" legacyBehavior><a className="btn-primary">Contact</a></Link></li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation Menu - Conditionally rendered based on isMenuOpen */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary bg-opacity-95 border-t border-accent">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/#about" legacyBehavior>
              <a className="block text-text hover:text-accent transition-colors py-2" onClick={toggleMenu}>About</a>
            </Link>
            <Link href="/#experience" legacyBehavior>
              <a className="block text-text hover:text-accent transition-colors py-2" onClick={toggleMenu}>Experience</a>
            </Link>
            <Link href="/blog" legacyBehavior>
              <a className="block text-text hover:text-accent transition-colors py-2" onClick={toggleMenu}>Blog</a>
            </Link>
            <Link href="/#contact" legacyBehavior>
              <a className="block btn-primary text-center py-2 mt-2" onClick={toggleMenu}>Contact</a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
