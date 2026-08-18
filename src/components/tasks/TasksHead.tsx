import { Tag } from "@prisma/client";
import AddTaskDialog from "./AddTaskDialog";

export default function TasksHead({ tags }: { tags: Tag[] }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          وظایف
        </h1>
      </div>
      <AddTaskDialog tags={tags} />
    </div>
  );
}
