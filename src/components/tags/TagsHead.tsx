import { Plus } from "lucide-react";
import { Button } from "../ui/button";

export default function TagsHead() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          برچسب ها
        </h1>
      </div>
      <Button className="flex items-center gap-2 font-semibold text-sm h-9 px-4 rounded-lg shadow-sm transition-colors">
        <span className="hidden sm:inline">افزودن برچسب</span>
        <Plus size={18} />
      </Button>
    </div>
  );
}
