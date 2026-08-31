import { createFileRoute, Link } from "@tanstack/react-router";
import heroImage from "@/assets/museum-hero.jpg";
import sculptureImage from "@/assets/sculpture-detail.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Living Timeline of Indian Art" },
      {
        name: "description",
        content:
          "Journey through thousands of years of India's artistic heritage in an immersive chronological museum experience.",
      },
      { property: "og:title", content: "The Living Timeline of Indian Art" },
      {
        property: "og:description",
        content:
          "An immersive digital museum tracing Indian art from the Indus Valley to contemporary practice.",
      },
    ],
  }),
  component: Index,
});

const NAV = ["Explore", "Timeline", "Gallery", "Learn", "About"];

const MARKERS = [
  "Indus Valley",
  "Mauryan",
  "Gupta",
  "Medieval",
  "Mughal",
  "Modern",
  "Contemporary",
];

const ERAS = [
  {
    n: "01",
    title: "Indus Valley Civilization",
    years: "3300–1300 BCE",
    note: "Seals, terracotta figurines and the earliest urban craft of the subcontinent.",
  },
  {
    n: "02",
    title: "Mauryan & Buddhist Art",
    years: "322 BCE–600 CE",
    note: "Polished pillars, stupas and the rock-cut sanctuaries of early Buddhism.",
  },
  {
    n: "03",
    title: "Gupta & Classical Art",
    years: "320–550 CE",
    note: "The classical idiom — serene sculpture, Ajanta murals, refined proportion.",
  },
  {
    n: "04",
    title: "Medieval & South Indian Art",
    years: "600–1500 CE",
    note: "Temple architecture, Chola bronzes and regional schools of devotion.",
  },
  {
    n: "05",
    title: "Mughal, Rajput & Pahari Art",
    years: "1500–1850 CE",
    note: "Courtly miniatures, illuminated manuscripts and lyrical hill painting.",
  },
  {
    n: "06",
    title: "Colonial & Modern Indian Art",
    years: "1850–1980 CE",
    note: "Academies, the Bengal School and the modernists who followed.",
  },
  {
    n: "07",
    title: "Contemporary Indian Art",
    years: "1980–Present",
    note: "Installation, photography and a global conversation rooted in place.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <a href="/" className="eyebrow !text-foreground">
            Indian Art Timeline
          </a>
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </nav>
          <Link
            to="/museum"
            className="eyebrow border-b border-primary/40 pb-1 !text-primary transition-colors hover:border-primary"
          >
            Enter Museum →
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="explore" className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="reveal">
              <p className="eyebrow">Est. 3300 BCE — A digital museum</p>
              <h1 className="display mt-6 text-[clamp(2.6rem,7vw,5.4rem)]">
                The Living Timeline
                <span className="block italic text-primary">of Indian Art</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Journey through thousands of years of India's artistic heritage, from ancient
                civilizations to contemporary expression.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Each era unfolds as a gallery you can walk through — sculpture, painting,
                architecture and craft placed in chronological sequence, with the context that
                shaped them.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
                <Link
                  to="/museum"
                  className="eyebrow bg-primary px-8 py-4 !text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Enter the Museum →
                </Link>
                <a
                  href="#timeline"
                  className="eyebrow border-b border-border pb-1 !text-foreground transition-colors hover:border-primary hover:!text-primary"
                >
                  Explore the Timeline ↓
                </a>
              </div>
            </div>

            <div className="reveal relative" style={{ animationDelay: "150ms" }}>
              <div className="relative overflow-hidden bg-sandstone">
                <img
                  src={heroImage}
                  alt="Sunlit museum gallery with arched openings and an Indian stone sculpture"
                  width={1600}
                  height={1200}
                  className="h-[46vh] w-full object-cover md:h-[68vh]"
                />
              </div>
              <div className="absolute -bottom-8 -left-6 hidden w-40 overflow-hidden border-4 border-background md:block">
                <img
                  src={sculptureImage}
                  alt="Detail of a carved Gupta-era sandstone figure"
                  width={912}
                  height={1200}
                  loading="lazy"
                  className="h-52 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section id="timeline" className="border-t border-border bg-secondary/60">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <h2 className="display text-[clamp(2rem,4vw,3.2rem)]">A Journey Through Time</h2>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Indian art has evolved over thousands of years, shaped by civilizations,
                religions, dynasties, cultures and changing forms of expression. What survives is
                not a single tradition but a long conversation — between region and empire,
                ritual and craft, inheritance and invention.
              </p>
            </div>

            <div className="mt-20">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">3300 BCE</span>
                <span className="eyebrow">Present</span>
              </div>
              <div className="relative mt-4 border-t border-foreground/25">
                <div className="grid grid-cols-2 gap-y-8 pt-6 sm:grid-cols-4 lg:grid-cols-7">
                  {MARKERS.map((m) => (
                    <div key={m} className="relative">
                      <span className="absolute -top-6 left-0 block h-3 w-px bg-foreground/35" />
                      <span className="block font-serif text-lg text-foreground">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eras */}
        <section id="gallery" className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)]">Seven Eras</h2>
            <p className="eyebrow">Galleries opening in sequence</p>
          </div>

          <ul className="mt-12 border-t border-border">
            {ERAS.map((era) => (
              <li key={era.n}>
                <Link
                  to="/museum"
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-b border-border py-7 transition-colors hover:bg-secondary/70 md:grid-cols-[5rem_1.1fr_1fr_auto] md:px-2"
                >
                  <span className="font-serif text-xl text-muted-foreground transition-colors group-hover:text-primary">
                    {era.n}
                  </span>
                  <h3 className="font-serif text-2xl leading-tight text-foreground transition-transform duration-500 group-hover:translate-x-1 md:text-[1.75rem]">
                    {era.title}
                  </h3>
                  <p className="col-span-2 max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-1">
                    {era.note}
                  </p>
                  <span className="eyebrow col-span-2 md:col-span-1 md:text-right">
                    {era.years}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Enter */}
        <section id="enter" className="border-y border-border bg-sandstone">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
            <p className="eyebrow">The Museum</p>
            <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)]">Ready to step inside?</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Explore India's artistic history through an immersive digital museum where every
              gallery represents a moment in time.
            </p>
            <Link
              to="/museum"
              className="eyebrow mt-12 inline-block border border-primary px-12 py-5 !text-primary transition-colors hover:bg-primary hover:!text-primary-foreground"
            >
              Enter the Museum →
            </Link>
          </div>
        </section>
      </main>

      <footer id="about" className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="font-serif text-2xl">The Living Timeline of Indian Art</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An educational archive and immersive museum experience, currently in development.
            </p>
          </div>
          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Project</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Project Team</li>
              <li>Academic References</li>
              <li>Image Credits</li>
            </ul>
          </div>
        </div>
        <p className="mt-14 border-t border-border pt-6 text-xs tracking-widest text-muted-foreground uppercase">
          © {new Date().getFullYear()} Indian Art Timeline
        </p>
      </footer>
    </div>
  );
}
