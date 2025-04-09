import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import { courseSimpleSchema } from "../../schemas/coursesSchema";
import { Button, buttonVariants } from "../../ui/Button";
import { NavLink } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import CourseCardActions from "./CourseCardActions";
import { EllipsisVertical } from "lucide-react";

type Course = z.infer<typeof courseSimpleSchema>;

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="w-[24rem]">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>Мій курс</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>{course.description}</p>
      </CardContent>

      <CardFooter className="flex flex-row items-center justify-between">
        <NavLink
          to={`${course.id}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Більше
        </NavLink>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <EllipsisVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent sideOffset={8} className="w-48">
            <CourseCardActions course={course} />
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}

export default CourseCard;
