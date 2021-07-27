export interface Station {
  stations: StationElement[];
}

export interface StationElement {
  name: string;
  id: string;
  lines: Line[];
}

export interface Line {
  type: string;
  id: string;
  fahrtNr: null;
  name: string;
  public: boolean;
  mode: string;
  product: string;
  symbol: Symbol | null;
  nr: number;
  metro: boolean;
  express: boolean;
  night: boolean;
}
