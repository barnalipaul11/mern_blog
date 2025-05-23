// dashboard
import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, User } from "lucide-react";
import InterviewCard from "@/components/shared/InterviewCard";
import OpportunityCard from "@/components/shared/OpportunityCard";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const BlogDetails = () => {
  const user = useSelector((state) => state.user);
  const userId = user?.user?._id;
  const [interviews, setInterviews] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

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

  useEffect(() => {
    if (!user?.user?._id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const myInterviews = data.filter(
          (interview) => interview.author._id === user.user._id
        );
        setInterviews(myInterviews);
      })
      .catch((err) => {
        console.error("Failed to fetch interviews:", err);
      });
  }, [user?.user?._id]);

  useEffect(() => {
    if (!user?.user?._id) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/opportunity/`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const myOpportunities = data.filter(
          (opportunity) => opportunity.userId._id === user.user._id
        );
        setOpportunities(myOpportunities);
      })
      .catch((err) => {
        console.error("Failed to fetch opportunities:", err);
      });
  }, [user?.user?._id]);

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-8">Failed to load user data.</p>
    );
  if (!userData?.user)
    return <p className="text-center mt-8">User not found.</p>;
  // Delete interview handler

const handleDelete = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to delete interview');

    // Update local state after deletion
    const updatedInterviews = interviews.filter(interview => interview._id !== id);
    setInterviews(updatedInterviews);
    filterAndSearch(filters, searchQuery); // reapply filters to updated list
  } catch (err) {
    console.error('Error deleting interview:', err);
  }
};
const handleDeleteOp = async (id) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/opportunity/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!res.ok) throw new Error('Failed to delete opportunity');

    const updatedOpportunities = opportunities.filter(opportunity => opportunity._id !== id);
    setOpportunities(updatedOpportunities);
  } catch (err) {
    console.error('Error deleting opportunity:', err);
  }
};

  // Edit interview handler placeholder
  const handleEdit = (id) => {
    console.log('Edit interview with id:', id);
    // Add navigation or modal logic here if needed
  };
  return (
    <div className="max-w-screen-xl mx-auto px-0 py-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground text-base">
          Manage your posts and account settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile card */}
     <div className="col-span-1 ">
        <Card
          className="
           relative h-[500px] flex flex-col items-center justify-center text-center
  transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 
  hover:shadow-2xl hover:shadow-[#e11d48]/30 
  bg-rose-100 text-black hover:bg-gray-50 
  dark:bg-black dark:text-white dark:hover:bg-gradient-to-br dark:hover:from-black dark:hover:to-[#0f0f0f]
  shadow-lg rounded-2xl border border-[#E6253F] 
  hover:border-[#FF4D5A]
          "
        >
          <CardHeader className="flex flex-col items-center">
            <Avatar className="w-28 h-28 border-4 border-[#E6253F] hover:border-[#FF4D5A] transition-all duration-300">
              {userData.user.avatar ? (
                <AvatarImage
                  src={userData.user.avatar}
                  alt={userData.user.name}
                />
              ) : (
                <AvatarFallback className="text-3xl font-bold text-[#E6253F]">
                  {getInitials(userData.user.name)}
                </AvatarFallback>
              )}
            </Avatar>
            <CardTitle className="mt-5 text-2xl font-bold text-[#E6253F]">
              {userData.user.name}
            </CardTitle>
            <p className="text-sm text-[#FF6F7A] mt-1">{userData.user.email}</p>
          </CardHeader>
          <CardContent className="pt-6 px-8">
            <p className="text-sm text-white mb-6 italic">{userData.user.bio}</p>
            <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <Link to="/profile">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 font-semibold text-[#E6253F] border-[#E6253F] hover:bg-[#FF4D5A] hover:text-white transition-colors"
              >
                <User size={18} className="text-[#E6253F]" />
                Edit Profile
              </Button>
            </Link>
            <Link to="/blog/add">
                <Button
                variant="default"
                className="w-full flex items-center justify-center gap-3 font-semibold bg-[#E6253F] hover:bg-[#FF4D5A]"
              >
                <PenSquare size={18} />
                Create New Post
              </Button>
            </Link>
              
            </div>
          </CardContent>
        </Card>
      </div>





        {/* Tabs */}
        <div className="col-span-1 lg:col-span-3">
          <Tabs defaultValue="interviews" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6 rounded-xl">
              <TabsTrigger value="interviews" className="w-full">
                My Interviews
              </TabsTrigger>
              <TabsTrigger value="opportunities" className="w-full">
                My Opportunities
              </TabsTrigger>
            </TabsList>

            {/* Interview Section */}
            <TabsContent value="interviews">
              <h2 className="text-xl font-semibold mb-4">
                Your Interview Experiences
              </h2>
              {interviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {interviews.map((interview) => (
                    <InterviewCard key={interview._id} interview={interview}  onDelete={handleDelete}/>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">
                    No interviews posted yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Share your experiences to help others
                  </p>
                  <Link to="/blog/add">
                      <Button>Share Interview Experience</Button>
                  </Link>
                
                </div>
              )}
            </TabsContent>

            {/* Opportunity Section */}
            <TabsContent value="opportunities">
              <h2 className="text-xl font-semibold mb-4">
                Job Opportunities You've Posted
              </h2>
              {opportunities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {opportunities.map((opportunity) => (
                    <OpportunityCard
                      key={opportunity._id}
                      opportunity={opportunity}
                      onDelete={handleDeleteOp}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">
                    No opportunities posted yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Share job opportunities to help others
                  </p>
                  <Link to="/blog/add">
                      <Button>Post a Job Opportunity</Button>
                  </Link>
                 
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