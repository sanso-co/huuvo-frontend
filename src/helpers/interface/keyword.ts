export interface KeywordType {
  id: number;
  name: string;
}

export interface Keywords {
  id: number;
  results: KeywordType[];
}
