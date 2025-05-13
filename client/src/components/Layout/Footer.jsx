import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-3 mt-2">
      <div className="container mx-auto text-center text-sm space-y-1">
        <p>&copy; 2025 CareerConnect. All rights reserved.</p>
        <div className="flex justify-center space-x-4 items-center text-foreground/70">
          <a href="mailto:careerconnect@example.com" className="hover:text-primary" title="Email">
            <Mail size={20} />
          </a>
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-primary" title="GitHub">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/barnalipaul890/" target="_blank" rel="noopener noreferrer" className="hover:text-primary" title="LinkedIn">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
