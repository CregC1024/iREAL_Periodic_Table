export interface Element {
  number: number;
  symbol: string;
  name: string;
  atomic_mass: number;
  category: string;
  period: number;
  group: number | null;
  block: string;
  phase: string;
  electron_configuration: string;
  electronegativity: number | null;
  discovered: number | null;
  xpos: number;
  ypos: number;
  summary: string;
}
