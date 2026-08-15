"use client";

import { Edit, Trash2 } from "lucide-react";
import { Tag } from "@prisma/client";
import { Button } from "../ui/button";
import EditTagDialog from "./EditTagDialog";

export default function TagCard({ tag }: { tag: Tag }) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4 flex items-center justify-between shadow-sm transition-all hover:shadow-md"
      style={{ border: `solid 1px var(--tag-${tag.color}-bg)` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: `var(--tag-${tag.color})` }}
        />
        <span className="font-semibold text-foreground">{tag.name}</span>
      </div>
      <div className="flex items-center gap-1">
        <EditTagDialog tag={tag} />
        <Button variant="ghost" className="w-9 h-9">
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
}
