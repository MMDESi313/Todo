"use client";

import { TagIcon } from "lucide-react";

export default function EmptyTagsState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-border rounded-2xl mt-6">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <TagIcon className="text-muted-foreground" size={28} />
      </div>
      <h3 className="text-lg font-bold text-foreground">
        هنوز برچسبی نساخته‌اید
      </h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-xs">
        با برچسب‌ها می‌تونید وظایفتون رو دسته‌بندی و راحت‌تر پیدا کنید
      </p>
    </div>
  );
}
