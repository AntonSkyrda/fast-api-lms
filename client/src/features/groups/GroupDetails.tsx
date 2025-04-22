import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Heading from "../../ui/Heading";
import SpinnerMini from "../../ui/SpinnerMini";
import GroupStudents from "./GroupStudents";
import { useGroup } from "./useGroup";
import { badgeVariants } from "../../ui/badge";
import UpdateGroup from "./UpdateGroup";
import DeleteGroup from "./DeleteGroup";

function GroupDetails() {
  const { group, isLoading } = useGroup();

  if (isLoading)
    return (
      <Card className="flex h-2/3 items-center justify-center">
        <SpinnerMini size="xl" />
      </Card>
    );

  if (!group) return null;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          <Heading as="h3">{group?.name}</Heading>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-row items-baseline gap-5">
          <Heading as="h4">Рік навчання:</Heading> <p>{group.year_of_study}</p>
        </div>

        <GroupStudents group={group} />

        <div className="flex flex-row items-center gap-5">
          <Heading as="h4">Курси групи:</Heading>
          <ul className="flex flex-wrap gap-3">
            {group.courses.map((course) => (
              <li key={course.id}>
                <NavLink
                  to={`/courses/${course.id}`}
                  className={badgeVariants({ variant: "outline" })}
                >
                  {course.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-5">
        <UpdateGroup group={group} />
        <DeleteGroup group={group} />
      </CardFooter>
    </Card>
  );
}

export default GroupDetails;
