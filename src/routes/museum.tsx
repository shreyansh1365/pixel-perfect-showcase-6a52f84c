import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const Museum = lazy(() => import("@/components/museum/Museum"));

export const Route = createFileRoute("/museum")({
  head: () => ({
    meta: [
      { title: "Virtual Museum · The Living Timeline of Indian Art" },
      {
        name: "description",
        content:
          "Walk through a light-filled 3D museum with seven galleries tracing Indian art from the Indus Valley to contemporary practice.",
      },
      { property: "og:title", content: "Virtual Museum · The Living Timeline of Indian Art" },
      {
        property: "og:description",
        content:
          "An explorable 3D museum with an entrance hall, central corridor and seven chronological galleries of Indian art.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MuseumPage,
});

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <p className="eyebrow">Opening the galleries…</p>
    </div>
  );
}

function MuseumPage() {
  return (
    <div className="fixed inset-0 bg-background">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-4">
        <Link to="/" className="eyebrow border-b border-border pb-1 !text-foreground hover:border-primary">
          ← Back to timeline
        </Link>
        <span className="eyebrow">Virtual Museum</span>
      </div>
      <ClientOnly fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          <Museum />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
