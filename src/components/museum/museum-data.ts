export type GalleryDef = {
  n: string;
  title: string;
  years: string;
  /** -1 = left of the corridor, 1 = right */
  side: -1 | 1;
  /** centre of the gallery doorway along the corridor axis */
  z: number;
};

export const CORRIDOR_HALF_WIDTH = 5;
export const GALLERY_W = 20;
export const GALLERY_D = 16;
export const WALL_H = 7;
export const CORRIDOR_START = 12;
export const GALLERY_SPACING = 20;

export const GALLERIES: GalleryDef[] = [
  { n: "01", title: "Indus Valley", years: "3300–1300 BCE", side: -1, z: -6 },
  { n: "02", title: "Mauryan & Buddhist", years: "322 BCE–600 CE", side: 1, z: -6 },
  { n: "03", title: "Gupta & Classical", years: "320–550 CE", side: -1, z: -26 },
  { n: "04", title: "Medieval & South Indian", years: "600–1500 CE", side: 1, z: -26 },
  { n: "05", title: "Mughal & Rajput", years: "1500–1850 CE", side: -1, z: -46 },
  { n: "06", title: "Modern Indian Art", years: "1850–1980 CE", side: 1, z: -46 },
  { n: "07", title: "Contemporary Art", years: "1980–Present", side: -1, z: -66 },
];

export const CORRIDOR_END = -80;
