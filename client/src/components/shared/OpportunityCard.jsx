import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Calendar, MapPin, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

const OpportunityCard = ({ opportunity, onEdit, onDelete }) => {
  const {
    company,
    role,
    type,
    location,
    stipend,
    applicationDeadline,
    author
  } = opportunity

  const formattedDeadline = format(new Date(applicationDeadline), "MMM dd, yyyy")
  const deadlineDate = new Date(applicationDeadline)
  const today = new Date()
  const daysUntilDeadline = Math.ceil((deadlineDate - today) / (1000 * 3600 * 24))
  const isDeadlineApproaching = daysUntilDeadline <= 5 && daysUntilDeadline >= 0
  const isDeadlinePassed = daysUntilDeadline < 0

  const getInitials = name => name.split(" ").map(p => p[0]).join("").toUpperCase()

  return (
    <Card className="h-fit flex flex-col transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg border border-border hover:border-primary/30">
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Badge variant="outline" className="border-primary/40 bg-primary/5">
              {company.name}
            </Badge>
            <h3 className="text-base font-semibold leading-snug hover:text-primary transition-colors duration-200">
              {role}
            </h3>
          </div>
          <div className="flex items-start gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(opportunity)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onDelete(opportunity)}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-1 pt-0 text-sm text-muted-foreground">
        <div className="flex items-center mb-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>

        {stipend && (
          <div className="mb-1">
            {type === "internship" ? "Stipend" : "Salary"}:{" "}
            <span className="font-medium">{stipend}</span>
          </div>
        )}

        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            Deadline: {formattedDeadline}
            {isDeadlineApproaching && !isDeadlinePassed && (
              <Badge variant="destructive" className="ml-2 text-xs">Closing Soon</Badge>
            )}
            {isDeadlinePassed && (
              <Badge variant="outline" className="ml-2 text-xs bg-muted/30">Closed</Badge>
            )}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex items-center gap-2 border-t border-border">
        <Avatar className="h-6 w-6">
          {author.avatar ? (
            <AvatarImage src={author.avatar} alt={author.name} />
          ) : (
            <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
          )}
        </Avatar>
        <span className="text-sm text-muted-foreground">
          Posted by {author.name}
        </span>
      </CardFooter>
    </Card>
  )
}


export default OpportunityCard
