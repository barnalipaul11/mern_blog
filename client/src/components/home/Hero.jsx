import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden bg-grid-pattern">
      {/* Decorative Floating Elements */}
      <div className="absolute w-10 h-10 bg-white opacity-40 rounded-full top-10 left-10 animate-float-fast shadow-xl"></div>
      <div className="absolute w-12 h-12 bg-primary opacity-50 rounded-full bottom-16 right-12 animate-float-fast shadow-xl"></div>
      <div className="absolute w-8 h-8 bg-secondary opacity-50 rounded-full top-24 right-20 animate-float-fast shadow-xl"></div>
      <div className="absolute w-9 h-9 bg-accent opacity-50 rounded-full bottom-24 left-1/3 animate-float-fast shadow-xl"></div>
      <div className="absolute w-11 h-11 bg-destructive opacity-40 rounded-full top-36 left-1/4 animate-float-fast shadow-xl"></div>
      <div className="absolute w-10 h-10 bg-muted opacity-50 rounded-full bottom-10 right-1/4 animate-float-fast shadow-xl"></div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary animate-fadeIn drop-shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          CareersConnect
        </h1>
        <p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fadeIn"
          style={{ animationDelay: '0.2s' }}
        >
          Share interview experiences and discover job opportunities to accelerate your career growth
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn"
          style={{ animationDelay: '0.4s' }}
        >
          <Link to="/interview">
            <Button size="lg" className="gap-2">
              Browse Interviews
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/opportunities">
            <Button size="lg" variant="outline" className="gap-2">
              Find Opportunities
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
