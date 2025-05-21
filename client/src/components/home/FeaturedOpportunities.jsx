import OpportunityCard from '@/components/shared/OpportunityCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';



const FeaturedOpportunities = () => {
  return (
    <section className="py-12 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold highlight-border pb-2">Latest Opportunities</h2>
          <Link to="/opportunities">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
