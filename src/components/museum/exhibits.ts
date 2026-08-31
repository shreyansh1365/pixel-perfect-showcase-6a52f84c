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
};
