
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 bg-secondary/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-xl">R</span>
              </div>
              <span className="font-medium text-xl">SmartCV</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Craft the perfect resume with AI-powered insights and guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-sm">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/builder" className="text-muted-foreground hover:text-foreground transition-colors">Resume Builder</Link></li>
              <li><Link to="/analyzer" className="text-muted-foreground hover:text-foreground transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">Templates</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-sm">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SmartCV. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with precision. Built with care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
