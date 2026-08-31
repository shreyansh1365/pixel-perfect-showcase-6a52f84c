import dancingGirl from "@/assets/museum/indus-dancing-girl.png";
import priestKing from "@/assets/museum/indus-priest-king.png";
import indusSeals from "@/assets/museum/indus-seals.png";
import mohenjoDaro from "@/assets/museum/indus-mohenjo-daro.jpg";
import cityPlan from "@/assets/museum/indus-city-plan.jpg";
import indusScript from "@/assets/museum/indus-script.jpg";

import lionCapital from "@/assets/museum/mauryan-lion-capital.png";
import sarnathBuddha from "@/assets/museum/mauryan-sarnath-buddha.png";
import sanchiStupa from "@/assets/museum/mauryan-sanchi-stupa.png";
import ashokanPillar from "@/assets/museum/wall-ashokan-pillar.jpg";
import sanchiGateway from "@/assets/museum/wall-sanchi-gateway.jpg";
import rockCutSanctuaries from "@/assets/museum/wall-rock-cut.jpg";

import guptaBuddha from "@/assets/museum/gupta-buddha.png";
import classicalSculpture from "@/assets/museum/gupta-classical-sculpture.png";
import ajantaMural from "@/assets/museum/gupta-ajanta-mural.jpg";
import ajantaCaves from "@/assets/museum/wall-ajanta-caves.jpg";
import guptaTemple from "@/assets/museum/wall-gupta-temple.jpg";

import cholaNataraja from "@/assets/museum/chola-nataraja.png";
import cholaBronzes from "@/assets/museum/chola-bronzes.png";
import templeSculpture from "@/assets/museum/south-indian-temple-sculpture.png";
import brihadeeswarar from "@/assets/museum/wall-brihadeeswarar.jpg";
import dravidianGopuram from "@/assets/museum/wall-dravidian-gopuram.jpg";
import bronzeCasting from "@/assets/museum/wall-bronze-casting.jpg";

import mughalMiniature from "@/assets/museum/mughal-miniature.jpg";
import rajputPainting from "@/assets/museum/rajput-painting.jpg";
import pahariPainting from "@/assets/museum/pahari-painting.jpg";
import mughalAtelier from "@/assets/museum/wall-mughal-atelier.jpg";
import krishnaRajput from "@/assets/museum/wall-krishna-rajput.jpg";
import miniatureTechnique from "@/assets/museum/wall-miniature-technique.jpg";

/**
 * Reusable exhibit system.
 *
 * Every gallery in `museum-data.ts` can declare exhibits here. Slots are
 * symbolic positions that already exist inside each gallery shell, so new
 * artifacts can be added without touching the museum architecture.
 */
export type ArtifactSlot = "pedestal-left" | "pedestal-right" | "case-center";
export type WallSlot = "wall-a" | "wall-b" | "wall-c";

export type Artifact = {
  id: string;
  slot: ArtifactSlot;
  /** rendered height of the artifact image, in metres */
  height: number;
  image: string;
  /** small 3D museum label, up to three lines */
  label: [string, string, string];
  name: string;
  period: string;
  date: string;
  material: string;
  origin: string;
  description: string;
  context: string;
  significance: string;
};

export type WallExhibit = {
  id: string;
  slot: WallSlot;
  image: string;
  title: string;
  caption: string;
};

export type GalleryExhibits = {
  intro?: string;
  artifacts: Artifact[];
  walls: WallExhibit[];
};

export const EXHIBITS: Record<string, GalleryExhibits> = {
  "01": {
    intro: "Cities of brick and water — the earliest urban art of the subcontinent.",
    artifacts: [
      {
        id: "indus-dancing-girl",
        slot: "pedestal-left",
        height: 1.35,
        image: dancingGirl,
        label: ["DANCING GIRL", "c. 2500 BCE", "Bronze · Mohenjo-daro"],
        name: "Dancing Girl",
        period: "Indus Valley Civilization",
        date: "c. 2500 BCE",
        material: "Bronze, lost-wax casting",
        origin: "Mohenjo-daro, Sindh",
        description:
          "A slender figure barely eleven centimetres tall stands with one hand resting on her hip, the other arm stacked from shoulder to wrist with bangles. Her head is tipped back and her weight rests on one leg in a pose of complete, unhurried confidence.",
        context:
          "Excavated by Ernest Mackay in 1926 in a modest house of the HR area of Mohenjo-daro, the statuette was cast by the lost-wax method — evidence that Harappan metalworkers were already fluent in a demanding technique around 2500 BCE.",
        significance:
          "It is the earliest known bronze of a human figure from the subcontinent and the first appearance of a bodily attitude — relaxed, asymmetrical, alive — that Indian sculpture would pursue for the next four thousand years.",
      },
      {
        id: "indus-priest-king",
        slot: "pedestal-right",
        height: 1.15,
        image: priestKing,
        label: ["PRIEST-KING", "Indus Valley Civilization", "Steatite · Mohenjo-daro"],
        name: "Priest-King",
        period: "Indus Valley Civilization",
        date: "c. 2200–1900 BCE",
        material: "Low-fired steatite",
        origin: "Mohenjo-daro, Sindh",
        description:
          "A bearded male bust with narrowed, half-closed eyes, a fillet band across the brow and a robe draped over the left shoulder, patterned with trefoils that were once filled with red paste.",
        context:
          "The name is a nineteenth-century habit rather than a fact: no Indus text has been read, and there is no evidence of kings or a priesthood. The trefoil motif appears on sacred objects across Mesopotamia and Egypt, hinting at a shared visual language of long-distance trade.",
        significance:
          "The most reproduced image of the civilization, it stands for everything the Indus withholds — a face of authority from a society whose writing, rulers and beliefs remain unread.",
      },
      {
        id: "indus-seals",
        slot: "case-center",
        height: 0.75,
        image: indusSeals,
        label: ["INDUS SEALS", "c. 2600–1900 BCE", "Steatite"],
        name: "Indus Seals",
        period: "Indus Valley Civilization",
        date: "c. 2600–1900 BCE",
        material: "Carved and fired steatite",
        origin: "Mohenjo-daro, Harappa, Lothal and Dholavira",
        description:
          "Small square tablets, rarely larger than a postage stamp, incised in reverse with an animal — most often the one-horned 'unicorn' bull — above a short line of Indus signs, with a pierced boss on the back for a cord.",
        context:
          "More than four thousand inscribed objects survive. Impressed into clay tags, the seals sealed bales of goods that travelled by river and sea to Oman and Mesopotamia, where Indus seals have been found in Sumerian cities.",
        significance:
          "The Indus script — around 400 signs, never in a text longer than about twenty-six characters — remains undeciphered. These miniature carvings are simultaneously the civilization's finest artistry and its unopened archive.",
      },
    ],
    walls: [
      {
        id: "wall-mohenjo-daro",
        slot: "wall-b",
        image: mohenjoDaro,
        title: "Mohenjo-daro",
        caption: "Baked-brick streets, wells and the Great Bath",
      },
      {
        id: "wall-city-plan",
        slot: "wall-a",
        image: cityPlan,
        title: "Harappan City Planning",
        caption: "Grid streets, citadel mound and covered drains",
      },
      {
        id: "wall-script",
        slot: "wall-c",
        image: indusScript,
        title: "The Indus Script",
        caption: "Undeciphered signs incised in steatite",
      },
    ],
  },
  "02": {
    intro: "Polished sandstone, imperial ethics and the first images of the Buddha.",
    artifacts: [
      {
        id: "mauryan-lion-capital",
        slot: "pedestal-left",
        height: 1.35,
        image: lionCapital,
        label: ["LION CAPITAL OF ASHOKA", "c. 250 BCE", "Polished sandstone · Sarnath"],
        name: "Lion Capital of Ashoka",
        period: "Mauryan & Buddhist Art",
        date: "c. 250 BCE",
        material: "Polished sandstone",
        origin: "Sarnath, Uttar Pradesh",
        description:
          "Four addorsed lions stand back-to-back on a carved abacus, their manes rendered as crisp, rhythmic curls. Below them, a frieze of a lion, horse, bull and elephant alternates with wheel motifs, all resting on a bell-shaped lotus.",
        context:
          "Commissioned by Emperor Ashoka to mark the site of the Buddha's first sermon, this capital crowned a polished sandstone pillar. Its mirror-like surface and disciplined symmetry announce the Mauryan empire's ambition to turn stone into a medium of imperial ethics and moral instruction.",
        significance:
          "The four lions were adopted as the national emblem of independent India in 1950, while the wheel motif became the central device of the national flag. The capital is at once a Buddhist relic and a modern symbol of the Indian republic.",
      },
      {
        id: "mauryan-buddhist-sculpture",
        slot: "pedestal-right",
        height: 1.45,
        image: sarnathBuddha,
        label: ["BUDDHIST SCULPTURE", "c. 2nd century BCE–5th century CE", "Stone · Northern India"],
        name: "Buddhist Sculpture",
        period: "Mauryan & Buddhist Art",
        date: "c. 2nd century BCE–5th century CE",
        material: "Stone and stucco",
        origin: "Northern India, Gandhara and Mathura",
        description:
          "A standing image of the Buddha raises one hand in the abhaya mudra of reassurance, the folds of the robe falling in rhythmic waves. The face is composed and meditative, the gaze lowered in inward concentration rather than outward command.",
        context:
          "For several centuries after the Buddha's death his presence was indicated only through symbols — an empty throne, a footprint, a wheel. Under the Kushans, sculptors in Gandhara and Mathura began to carve human figures, each school shaping a different ideal of spiritual awakening.",
        significance:
          "These images transformed monasteries and pilgrimage sites into powerful visual teachers. The move from symbolic to anthropomorphic representation is one of the most important shifts in Indian religious art.",
      },
      {
        id: "mauryan-sanchi-stupa",
        slot: "case-center",
        height: 1.55,
        image: sanchiStupa,
        label: ["GREAT STUPA AT SANCHI", "3rd century BCE onwards", "Stone · Madhya Pradesh"],
        name: "Great Stupa at Sanchi",
        period: "Mauryan & Buddhist Art",
        date: "3rd century BCE onwards",
        material: "Stone and brick",
        origin: "Sanchi, Madhya Pradesh",
        description:
          "A hemispherical brick dome rises above a stone terrace, crowned by a square harmika and a triple umbrella. Four monumental gateways frame the processional path, their surfaces carved with stories of the Buddha's former lives and the life of the historical Buddha.",
        context:
          "Stupas were built to enshrine relics and mark sacred sites. At Sanchi, Ashoka is said to have commissioned the original structure, which was enlarged and encased in stone over the following centuries. Pilgrims walked clockwise around the dome, reading the carvings as they moved.",
        significance:
          "The gateways are among the earliest narrative reliefs in India. They teach Buddhist ethics through visual storytelling and establish a language of architectural symbolism that influenced temple design across South Asia.",
      },
    ],
    walls: [
      {
        id: "wall-ashokan-pillar",
        slot: "wall-a",
        image: ashokanPillar,
        title: "Ashokan Pillar",
        caption: "Polished sandstone proclaiming dharma across the empire",
      },
      {
        id: "wall-sanchi-gateway",
        slot: "wall-b",
        image: sanchiGateway,
        title: "Sanchi Gateway",
        caption: "Narrative reliefs on a grand torana",
      },
      {
        id: "wall-rock-cut",
        slot: "wall-c",
        image: rockCutSanctuaries,
        title: "Rock-cut Sanctuaries",
        caption: "Early Buddhist halls and chaityas carved into stone",
      },
    ],
  },
  "03": {
    intro: "Serene proportion and classical balance — the golden age of Indian form.",
    artifacts: [
      {
        id: "gupta-buddha",
        slot: "pedestal-left",
        height: 1.75,
        image: guptaBuddha,
        label: ["BUDDHA IMAGE OF THE GUPTA PERIOD", "c. 5th century CE", "Sandstone · Northern India"],
        name: "Buddha Image of the Gupta Period",
        period: "Gupta & Classical Art",
        date: "c. 5th century CE",
        material: "Sandstone",
        origin: "Northern India (Sarnath and Mathura workshops)",
        description:
          "The Buddha stands with lowered eyes and a faint inward smile, the robe clinging to the body in fine, almost weightless folds. Tight snail-shell curls cover the head, a halo frames it, and the proportions follow a calm mathematical harmony rather than muscular display.",
        context:
          "Gupta-period workshops at Sarnath and Mathura distilled the earlier Gandharan and Kushan experiments into a single idealized type. Sculptors worked from canonical proportions and prescribed marks of a great being, so that the figure reads as a state of mind made visible instead of a portrait.",
        significance:
          "This is the classical Buddha image: serene, balanced, self-contained. It became the model carried by monks and merchants to Southeast Asia, China and Japan, and its measured proportions shaped Indian sculpture for the next thousand years.",
      },
      {
        id: "gupta-classical-sculpture",
        slot: "pedestal-right",
        height: 1.5,
        image: classicalSculpture,
        label: ["CLASSICAL INDIAN SCULPTURE", "Gupta Period", "Stone"],
        name: "Classical Indian Sculpture",
        period: "Gupta & Classical Art",
        date: "c. 4th–6th century CE",
        material: "Stone",
        origin: "Northern and Central India",
        description:
          "A gently swaying figure turns at the hip, the body composed of smooth, unbroken volumes. Ornament is restrained and the drapery is barely incised, so attention falls on the rhythm of the pose and the quiet expression of the face.",
        context:
          "Alongside Buddhist images, Gupta workshops produced Hindu and Jain figures for the earliest structural temples. Sculptors codified proportion, stance and gesture into a shared grammar recorded in later treatises on image-making, giving craftsmen across regions a common measure of beauty.",
        significance:
          "Refinement rather than grandeur defines this phase: spiritual feeling expressed through balance, restraint and idealized form. That grammar of proportion passed directly into the Chalukya, Pallava, Chola and later temple traditions.",
      },
      {
        id: "gupta-ajanta-paintings",
        slot: "case-center",
        height: 1.65,
        image: ajantaMural,
        label: ["AJANTA CAVE PAINTINGS", "c. 2nd century BCE–6th century CE", "Murals · Maharashtra"],
        name: "Ajanta Cave Paintings",
        period: "Gupta & Classical Art",
        date: "c. 2nd century BCE–6th century CE",
        material: "Mural painting on lime plaster",
        origin: "Ajanta, Maharashtra",
        description:
          "Crowded courts, bodhisattvas with downcast eyes, dancers, animals and travellers move across the cave walls in continuous scenes. Figures are modelled with soft tonal shading and outlined in fluid, confident line, their gestures carrying the emotion of the story.",
        context:
          "Thirty rock-cut halls and monasteries curve around a river gorge in the Waghora valley. Painters laid earth pigments over a prepared clay-and-lime ground, working by reflected daylight. The scenes illustrate the Jataka tales of the Buddha's former lives, unfolding without frames so that a walking visitor reads them as a narrative.",
        significance:
          "Ajanta is the finest surviving body of early Indian painting and the foundation of narrative pictorial art in Asia. Its shading, spatial layering and expressive gesture set conventions that reach forward to later mural, manuscript and miniature traditions.",
      },
    ],
    walls: [
      {
        id: "wall-ajanta-caves",
        slot: "wall-a",
        image: ajantaCaves,
        title: "The Ajanta Caves",
        caption: "Rock-cut monasteries above the Waghora gorge",
      },
      {
        id: "wall-gupta-temple",
        slot: "wall-c",
        image: guptaTemple,
        title: "Gupta Temple Architecture",
        caption: "The first structural shrines in dressed stone",
      },
    ],
  },
  "04": {
    intro: "Bronze, granite and the temple as the centre of art in the medieval south.",
    artifacts: [
      {
        id: "chola-nataraja",
        slot: "case-center",
        height: 2.05,
        image: cholaNataraja,
        label: ["NATARAJA", "Chola Period · c. 10th–12th century CE", "Bronze · Tamil Nadu"],
        name: "Nataraja — Dancing Shiva",
        period: "Medieval & South Indian Art",
        date: "c. 10th–12th century CE",
        material: "Bronze, lost-wax casting",
        origin: "Chola country, Tamil Nadu",
        description:
          "Shiva dances inside a ring of flame, four arms held in perfect equilibrium: one beats the hourglass drum, one holds fire, one is raised in reassurance, one sweeps across the body in the gesture of the dance. One foot presses down a small crouching figure while the other lifts free, and the flying locks and sashes freeze a single instant of motion.",
        context:
          "The bronze was made for worship, not display. Under the Chola kings of the tenth to twelfth centuries, temple workshops cast icons that were bathed, dressed, garlanded and carried through the streets on festival days — which is why the base is pierced with slots for carrying poles. The ring of flames, the drum and the trampled figure of ignorance make a compact diagram of creation, preservation and release.",
        significance:
          "The Nataraja is the most concentrated image in Indian art: a theological argument resolved as a dancing body in balance. Its poise made it the emblem of South Indian bronze casting and one of the most widely recognised sculptural forms in the world.",
      },
      {
        id: "chola-bronzes",
        slot: "pedestal-left",
        height: 1.45,
        image: cholaBronzes,
        label: ["CHOLA BRONZES", "c. 9th–13th century CE", "Bronze · South India"],
        name: "Chola Bronzes",
        period: "Medieval & South Indian Art",
        date: "c. 9th–13th century CE",
        material: "Bronze, lost-wax casting",
        origin: "Tamil Nadu",
        description:
          "Slender standing deities and saints rise from lotus bases, bodies gently flexed at hip and shoulder, faces calm and ornament crisply modelled. Each stands on a plinth with lugs and rings — fittings for the poles that carried them in procession.",
        context:
          "Chola bronzes were cast solid by the lost-wax method: a wax model was built up in detail, coated in fine clay, fired so the wax ran out, then filled with molten alloy and broken free — meaning every image is unique, since the mould is destroyed to release it. Metalworking guilds worked to canonical proportions set out in image-making treatises, and temple inscriptions record the donors who paid for the metal.",
        significance:
          "Bronze made images mobile. Where stone sculpture stayed fixed in the shrine, these portable icons brought the deity out to the community, and their technical control and restrained sensuousness are regarded as the high point of metal sculpture in Asia.",
      },
      {
        id: "south-indian-temple-sculpture",
        slot: "pedestal-right",
        height: 1.6,
        image: templeSculpture,
        label: ["TEMPLE SCULPTURE", "Medieval South India", "Stone"],
        name: "Temple Sculpture",
        period: "Medieval & South Indian Art",
        date: "c. 7th–14th century CE",
        material: "Granite and sandstone",
        origin: "Tamil Nadu, Karnataka and the Deccan",
        description:
          "A carved panel of a deity flanked by attendants, cut in hard granite with firm outlines and shallow, confident modelling. The figures sit within a framing niche, designed to be read from the walkway of a temple wall rather than in the round.",
        context:
          "The medieval temple was the region's workshop, treasury, school and stage, and sculpture was inseparable from its architecture. Niches on the outer walls carried the principal deities, plinths and pillars carried dancers, musicians, guardians and narrative episodes, and doorways carried protective figures. Pallava, Chalukya, Hoysala and Chola workshops each developed distinct handling of the same shared repertoire.",
        significance:
          "Placement was meaning: as a worshipper circled the shrine, the sequence of carvings unfolded as an ordered account of myth and cosmos. This union of building and image defines the temple traditions of southern India and shaped religious architecture across Southeast Asia.",
      },
    ],
    walls: [
      {
        id: "wall-brihadisvara",
        slot: "wall-a",
        image: brihadeeswarar,
        title: "Brihadisvara Temple",
        caption: "Thanjavur, c. 1010 CE — the summit of Chola architecture",
      },
      {
        id: "wall-dravidian-architecture",
        slot: "wall-b",
        image: dravidianGopuram,
        title: "South Indian Temple Architecture",
        caption: "Dravidian towers and tiers dense with sculpture",
      },
      {
        id: "wall-lost-wax",
        slot: "wall-c",
        image: bronzeCasting,
        title: "The Lost-Wax Process",
        caption: "Wax model, clay mould, molten bronze — a single unique cast",
      },
    ],
  },
};

