import { TagFormData } from "@/schema/tag.schema";
import { Badge } from "../ui/badge";

export default function TagPreview({ color, name }: TagFormData) {
  return (
    <div className="w-full flex justify-between">
      <p className="font-medium">پیش نمایش</p>
      <Badge
        style={{
          backgroundColor: `var(--tag-${color}-bg)`,
          color: `var(--tag-${color})`,
        }}
      >
        {name ? name : "نام برچسب"}
      </Badge>
    </div>
  );
}
