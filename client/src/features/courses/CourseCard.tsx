import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button, buttonVariants } from "../../ui/button";
import { NavLink } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import CourseCardActions from "./CourseCardActions";
import { EllipsisVertical } from "lucide-react";
import { coursePlainSchema } from "../../schemas/plainShemas";

type Course = z.infer<typeof coursePlainSchema>;

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="min-h-[12rem]">
      <CardHeader>
        <CardTitle className="truncate">{course.name}</CardTitle>
        <CardDescription>Мій курс</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="truncate">{course.description}</p>
      </CardContent>

      <CardFooter className="mt-auto flex flex-row items-center justify-between">
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
