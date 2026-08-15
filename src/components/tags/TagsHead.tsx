import AddTagDialog from "./AddTagDialog";

export default function TagsHead() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          برچسب ها
        </h1>
      </div>
      <AddTagDialog />
    </div>
  );
}
