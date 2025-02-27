
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-xl">R</span>
            </div>
            <span className="font-medium text-xl hidden sm:block">SmartCV</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" className="animate-pulse-slow" asChild>
              <Link to="/builder">Create Resume</Link>
            </Button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 text-foreground rounded-md"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in glass mt-2 rounded-lg mx-6 py-6 px-4">
          <nav className="flex flex-col space-y-4">
            <NavLinks />
            <div className="pt-4 border-t border-border flex flex-col space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" className="w-full justify-start" asChild>
                <Link to="/builder">Create Resume</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = () => {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Home' },
    { path: '/builder', label: 'Resume Builder' },
    { path: '/analyzer', label: 'Resume Analyzer' },
    { path: '/about', label: 'About' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`transition-all duration-200 relative px-1 py-2 text-sm font-medium ${
            location.pathname === link.path
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {link.label}
          {location.pathname === link.path && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
          )}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
