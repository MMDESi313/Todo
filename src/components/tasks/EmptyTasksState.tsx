import { ListTodo } from "lucide-react";

export default function EmptyTasksState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-border rounded-2xl mt-6">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <ListTodo className="text-muted-foreground" size={28} />
      </div>
      <h3 className="text-lg font-bold text-foreground">
        هنوز وظیفه‌ای نساخته‌اید
      </h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-xs">
        اولین وظیفه‌ی خودتون رو اضافه کنید و شروع کنید
      </p>
    </div>
  );
}
