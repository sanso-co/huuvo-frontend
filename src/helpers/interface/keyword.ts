export interface Keyword {
  id: number;
  name: string;
}

export interface Keywords {
  id: number;
  results: Keyword[];
}
