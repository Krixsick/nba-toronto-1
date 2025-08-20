import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className=" h-[92vh]">
      <h3>Welcome Home!</h3>
    </div>
  );
}
