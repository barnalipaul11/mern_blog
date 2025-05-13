import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar, Star, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getDifficultyColor = (level) => {
  switch (level) {
    case "easy":
      return "bg-green-500/10 text-green-500 border-green-500/30";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
    case "hard":
      return "bg-red-500/10 text-red-500 border-red-500/30";
    default:
      return "bg-primary/10 text-primary border-primary/30";
  }
};

const InterviewCard = ({ interview, onEdit, onDelete }) => {
  const {
    id,
    company,
    role,
    date,
    difficultyLevel,
    tags,
    author,
    title,
  } = interview;

  const difficultyColor = getDifficultyColor(difficultyLevel);
  const formattedDate = format(new Date(date), "MMM dd, yyyy");
  const navigate = useNavigate();

  const getInitials = (name) =>
    name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();

  return (
    <Card className="h-full flex flex-col border hover:shadow-xl hover:border-primary/40 transition-all duration-200">
      <CardHeader className="pb-2 pt-3 px-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge
              variant="outline"
              className="mb-2 border-primary/40 bg-primary/5"
            >
              {company.name}
            </Badge>
            <h3
              onClick={() => navigate(`/interviews/${id}`)}
              className="text-lg font-semibold leading-tight hover:text-primary transition-colors duration-200 cursor-pointer"
            >
              {title}
            </h3>
          </div>
          <Badge variant="outline" className={`${difficultyColor}`}>
            {difficultyLevel.charAt(0).toUpperCase() +
              difficultyLevel.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-0 px-2 ">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Star className="h-4 w-4 mr-1" />
          <span>{role.name}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto pt-3 px-4 pb-3 flex items-center justify-between border-t border-border">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            {author.avatar ? (
              <AvatarImage src={author.avatar} alt={author.name} />
            ) : (
              <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-muted-foreground">{author.name}</span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex flex-wrap gap-1 mr-2">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-xs px-1.5">
                {tag.name}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="secondary" className="text-xs px-1.5">
                +{tags.length - 2}
              </Badge>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onEdit?.(id)}
          >
            <Pencil size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => onDelete?.(id)}
          >
            <Trash2 size={14} className="text-red-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
