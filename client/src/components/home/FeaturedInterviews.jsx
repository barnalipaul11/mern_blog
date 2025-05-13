import InterviewCard from '@/components/shared/InterviewCard'; // adjust the path as needed
import { Button } from '@/components/ui/button'; // adjust the path as needed
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const mockInterviews = [
  {
    id: '1',
    title: 'My Software Engineer Interview at Google',
    company: {
      id: 'google',
      name: 'Google'
    },
    role: {
      id: 'software-engineer',
      name: 'Software Engineer'
    },
    date: '2023-12-15',
    difficultyLevel: 'hard',
    tags: [
      { id: 'dsa', name: 'DSA' },
      { id: 'system-design', name: 'System Design' },
      { id: 'coding', name: 'Coding' }
    ],
    author: {
      id: 'user1',
      name: 'Alex Johnson',
    },
    content: 'Detailed description of the Google interview process...'
  },
  {
    id: '2',
    title: 'Data Science Interview Experience',
    company: {
      id: 'microsoft',
      name: 'Microsoft'
    },
    role: {
      id: 'data-scientist',
      name: 'Data Scientist'
    },
    date: '2024-01-10',
    difficultyLevel: 'medium',
    tags: [
      { id: 'ml', name: 'ML' },
      { id: 'statistics', name: 'Statistics' },
      { id: 'behavioral', name: 'Behavioral' }
    ],
    author: {
      id: 'user2',
      name: 'Priya Sharma',
    },
    content: 'My experience interviewing for a data science position...'
  },
  {
    id: '3',
    title: 'Product Manager Interview at Amazon',
    company: {
      id: 'amazon',
      name: 'Amazon'
    },
    role: {
      id: 'product-manager',
      name: 'Product Manager'
    },
    date: '2024-02-05',
    difficultyLevel: 'medium',
    tags: [
      { id: 'product-sense', name: 'Product Sense' },
      { id: 'behavioral', name: 'Behavioral' }
    ],
    author: {
      id: 'user3',
      name: 'Michael Wong',
    },
    content: 'Amazon PM interview rounds and questions...'
  },
];

const FeaturedInterviews = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold highlight-border pb-2">
            Featured Interview Experiences
          </h2>
          <Link to="/interviews">
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockInterviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInterviews;
