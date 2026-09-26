export type Spec = {
  value: string;
  unit?: string;
  label: string;
  note: string;
};

/**
 * Measured values only. Do not add figures here without test data.
 * FR-4 comparisons are typical reference values for conventional FR-4.
 */
export const specs: Spec[] = [
  {
    value: "262",
    unit: "°C",
    label: "Glass transition temperature (Tg)",
    note: "High thermal headroom for soldering and operation",
  },
  {
    value: "V-0",
    label: "UL94 flame rating",
    note: "Achieved halogen-free",
  },
  {
    value: "Up to 325",
    unit: "s",
    label: "Arc resistance",
    note: "vs 120–180 s typical for FR-4 · tested at CIPET Chennai, Aug 2026",
  },
  {
    value: "129–152",
    unit: "kJ/m²",
    label: "Unnotched Izod impact strength",
    note: "vs 3.7–8 kJ/m² typical for FR-4",
  },
  {
    value: "1.1–1.28",
    unit: "g/cm³",
    label: "Density",
    note: "Lighter than FR-4 (~1.9 g/cm³)",
  },
  {
    value: "Up to 2.4 × 10¹³",
    unit: "Ω·cm",
    label: "Volume resistivity",
    note: "Strong electrical insulation",
  },
];
