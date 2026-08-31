import type { Artifact } from "./exhibits";

const rows = (a: Artifact) => [
  ["Period", a.period],
  ["Date", a.date],
  ["Material", a.material],
  ["Origin", a.origin],
];

export default function ArtifactPanel({ artifact, onClose }: { artifact: Artifact; onClose: () => void }) {
  return (
    <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-end bg-foreground/10 backdrop-blur-[2px]">
      <aside
        role="dialog"
        aria-label={`${artifact.name} exhibit information`}
        className="m-4 flex max-h-[92%] w-full max-w-md flex-col overflow-hidden border border-border bg-background/95 shadow-[0_24px_60px_-30px_rgba(60,40,20,0.55)] md:m-8"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-7 pb-5 pt-6">
          <div>
            <p className="eyebrow">{artifact.period}</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-foreground">{artifact.name}</h2>
          </div>
          <img
            src={artifact.image}
            alt={artifact.name}
            loading="lazy"
            className="h-20 w-20 shrink-0 object-contain"
          />
        </div>

        <div className="overflow-y-auto px-7 py-6">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-b border-border pb-5">
            {rows(artifact).map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="eyebrow !text-muted-foreground">{k}</dt>
                <dd className="text-sm text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <Section title="Description" body={artifact.description} />
          <Section title="Historical Context" body={artifact.context} />
          <Section title="Cultural Significance" body={artifact.significance} />
        </div>

        <div className="border-t border-border px-7 py-4">
          <button
            onClick={onClose}
            className="eyebrow border-b border-primary/60 pb-1 !text-primary transition-colors hover:border-primary"
          >
            Close exhibit · return to gallery
          </button>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="mt-5">
      <h3 className="eyebrow">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </section>
  );
}
