import OpportunityCard from '@/components/shared/OpportunityCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockOpportunities = [
  {
    id: '1',
    company: {
      id: 'google',
      name: 'Google'
    },
    role: 'Software Engineer, New Grad',
    type: 'full-time',
    location: 'Bangalore, India',
    stipend: '₹27,00,000/year',
    applicationDeadline: '2024-05-30',
    applyLink: 'https://careers.google.com',
    eligibility: 'B.Tech/B.E., M.Tech/M.E. in Computer Science or related field',
    description: 'Join Google as a Software Engineer and work on products that impact millions of users...',
    author: {
      id: 'user1',
      name: 'Campus Team'
    },
    postedOn: '2024-04-01'
  },
  {
    id: '2',
    company: {
      id: 'microsoft',
      name: 'Microsoft'
    },
    role: 'Data Science Intern',
    type: 'internship',
    location: 'Hyderabad, India',
    stipend: '₹80,000/month',
    applicationDeadline: '2024-05-01',
    applyLink: 'https://careers.microsoft.com',
    eligibility: 'Pursuing B.Tech/B.E., M.Tech/M.E. in Computer Science, Statistics, or related field',
    description: 'Work with Microsoft\'s data science team to solve real-world problems...',
    author: {
      id: 'user2',
      name: 'HR Team'
    },
    postedOn: '2024-03-15'
  },
  {
    id: '3',
    company: {
      id: 'amazon',
      name: 'Amazon'
    },
    role: 'Product Manager',
    type: 'full-time',
    location: 'Remote, India',
    stipend: '₹22,00,000/year',
    applicationDeadline: '2024-06-15',
    applyLink: 'https://amazon.jobs',
    eligibility: 'MBA or equivalent with 0-2 years of experience',
    description: 'Drive product development for Amazon\'s e-commerce platform...',
    author: {
      id: 'user3',
      name: 'Recruiter'
    },
    postedOn: '2024-04-10'
  },
];

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
