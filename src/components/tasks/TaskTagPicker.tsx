"use client";

import { Tag } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function TaskTagPicker({
  tags,
  value,
  onChange,
  disabled,
}: {
  tags: Tag[];
  value: string[];
  onChange: (tagIds: string[]) => void;
  disabled?: boolean;
}) {
  if (tags.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">هنوز برچسبی نساخته‌اید.</p>
    );
  }

  function toggle(tagId: string) {
    onChange(
      value.includes(tagId)
        ? value.filter((id) => id !== tagId)
        : [...value, tagId],
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const selected = value.includes(tag.id);
        return (
          <Button
            key={tag.id}
            variant="outline"
            disabled={disabled}
            onClick={() => toggle(tag.id)}
            className={cn(
              "rounded-full transition-all cursor-pointer p-0 h-fit",
              !selected && "border text-muted-foreground",
            )}
          >
            <Badge
              variant="ghost"
              className="py-3"
              style={
                selected
                  ? {
                      backgroundColor: `var(--tag-${tag.color}-bg)`,
                      color: `var(--tag-${tag.color})`,
                      borderColor: `var(--tag-${tag.color})`,
                    }
                  : undefined
              }
            >
              {tag.name}
            </Badge>
          </Button>
        );
      })}
    </div>
  );
}
