
//dashboard
import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from '@/helpers/getEnv';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, User } from "lucide-react";

import InterviewCard from "@/components/shared/InterviewCard";
import OpportunityCard from "@/components/shared/OpportunityCard";
import Loading from "@/components/Loading";

const BlogDetails = () => {
  const user = useSelector((state) => state.user);
  const userId = user?.user?._id;

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    userId ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${userId}` : null,
    {
      method: "get",
      credentials: "include",
    }
  );

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center mt-8">Failed to load user data.</p>;
  if (!userData?.user) return <p className="text-center mt-8">User not found.</p>;

  const mockUserInterviews = [
    {
      id: "301",
      title: "Meta Frontend Interview Experience",
      company: { id: "meta", name: "Meta (Facebook)" },
      role: { id: "frontend-engineer", name: "Frontend Engineer" },
      date: "2024-02-10",
      difficultyLevel: "medium",
      tags: [
        { id: "react", name: "React" },
        { id: "javascript", name: "JavaScript" },
        { id: "html-css", name: "HTML/CSS" },
      ],
      author: { id: "user1", name: "Jane Smith" },
      content: "I had three rounds at Meta. The first round focused on system design for a UI dashboard...",
    },
    {
      id: "302",
      title: "Flipkart SDE-1 Interview",
      company: { id: "flipkart", name: "Flipkart" },
      role: { id: "sde-1", name: "SDE-1" },
      date: "2023-12-05",
      difficultyLevel: "easy",
      tags: [{ id: "dsa", name: "DSA" }, { id: "java", name: "Java" }],
      author: { id: "user1", name: "Jane Smith" },
      content: "Flipkart interview was more focused on DSA and core Java...",
    },
  ];

  const mockUserOpportunities = [
    {
      id: "401",
      company: { id: "netflix", name: "Netflix" },
      role: "UI Engineer Intern",
      type: "internship",
      location: "Remote",
      stipend: "₹50,000/month",
      applicationDeadline: "2024-06-01",
      applyLink: "https://jobs.netflix.com/internship",
      eligibility: "Final year students with React/Vue experience",
      description: "Join Netflix UI engineering as an intern...",
      author: { id: "user1", name: "Jane Smith" },
      postedOn: "2024-04-15",
    },
  ];

  return (
  <div className="max-w-screen-xl mx-auto px-0 py-4">
  <div className="mb-8">
    <h1 className="text-3xl font-bold mb-2">My Profile</h1>
    <p className="text-muted-foreground text-base">Manage your posts and account settings</p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
    {/* Profile card */}
   <div className="col-span-1 ">
  <Card className="shadow-md rounded-2xl border border-gray-200 h-[400px]"> {/* Adjust height here */}
    <CardHeader className="text-center">
      <Avatar className="w-24 h-24 mx-auto">
        {userData.user.avatar ? (
          <AvatarImage src={userData.user.avatar} alt={userData.user.name} />
        ) : (
          <AvatarFallback>{getInitials(userData.user.name)}</AvatarFallback>
        )}
      </Avatar>
      <CardTitle className="mt-4 text-xl font-semibold">{userData.user.name}</CardTitle>
      <p className="text-sm text-muted-foreground">{userData.user.email}</p>
    </CardHeader>
    <CardContent className="pt-0">
      <p className="text-sm text-center text-muted-foreground mb-4">{userData.user.bio}</p>
      <div className="flex flex-col gap-2">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <User size={16} />
          Edit Profile
        </Button>
        <Button variant="default" className="w-full flex items-center justify-center gap-2">
          <PenSquare size={16} />
          Create New Post
        </Button>
      </div>
    </CardContent>
  </Card>
</div>


    {/* Tabs */}
    <div className="col-span-1 lg:col-span-3">
      <Tabs defaultValue="interviews" className="w-full">
       <TabsList className="w-full grid grid-cols-2 mb-6 rounded-xl ">
      <TabsTrigger value="interviews" className="w-full">My Interviews</TabsTrigger>
      <TabsTrigger value="opportunities" className="w-full">My Opportunities</TabsTrigger>
      </TabsList>

        {/* Interview Section */}
        <TabsContent value="interviews">
          <h2 className="text-xl font-semibold mb-4">Your Interview Experiences</h2>
          {mockUserInterviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockUserInterviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No interviews posted yet</h3>
              <p className="text-muted-foreground mb-4">Share your experiences to help others</p>
              <Button>Share Interview Experience</Button>
            </div>
          )}
        </TabsContent>

        {/* Opportunity Section */}
        <TabsContent value="opportunities">
          <h2 className="text-xl font-semibold mb-4">Job Opportunities You've Posted</h2>
          {mockUserOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockUserOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No opportunities posted yet</h3>
              <p className="text-muted-foreground mb-4">Share job opportunities to help others</p>
              <Button>Post a Job Opportunity</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  </div>
</div>

  );
};

export default BlogDetails;
