
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10',
        isScrolled
          ? 'bg-background/70 backdrop-blur-lg border-b border-white/5 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-medium text-white flex items-center gap-2 group"
        >
          <span className="h-10 w-10 rounded-lg bg-health-600 flex items-center justify-center group-hover:bg-health-500 transition-colors">
            <Shield className="h-5 w-5 text-white" />
          </span>
          <span className="group-hover:text-health-400 transition-colors">HealthVault</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#vaccines">Vaccines</NavLink>
          <NavLink href="#benefits">Benefits</NavLink>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg bg-health-600 text-white font-medium transition-all hover:bg-health-500 hover:shadow-glow"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-white/10 shadow-lg p-4 transition-transform animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</MobileNavLink>
            <MobileNavLink href="#vaccines" onClick={() => setIsMobileMenuOpen(false)}>Vaccines</MobileNavLink>
            <MobileNavLink href="#benefits" onClick={() => setIsMobileMenuOpen(false)}>Benefits</MobileNavLink>
            <Link
              to="/signup"
              className="px-5 py-3 rounded-lg bg-health-600 text-white font-medium transition-all text-center hover:bg-health-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <a
      href={href}
      className="text-muted-foreground font-medium transition-all hover:text-health-400 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-health-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
    >
      {children}
    </a>
  );
};

const MobileNavLink = ({ href, children, onClick }: NavLinkProps) => {
  return (
    <a
      href={href}
      className="text-muted-foreground font-medium py-2 block border-b border-white/5 hover:text-health-400 transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Navbar;
