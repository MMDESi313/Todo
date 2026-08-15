import EmptyTagsState from "@/components/tags/EmptyTagsState";
import TagCard from "@/components/tags/TagCard";
import TagsHead from "@/components/tags/TagsHead";
import { getCurrentUser } from "@/lib/auth/session";
import getUserTags from "@/lib/tags";

export default async function TagsPage() {
  const user = await getCurrentUser();
  const tags = await getUserTags(user!.id);

  return (
    <div className="max-w-5xl mx-auto h-full">
      <TagsHead />
      {tags.length === 0 ? (
        <EmptyTagsState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map((tag) => (
            <TagCard key={tag.id} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
