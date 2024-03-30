import { Show } from "./show";

export interface Collection {
  _id: string;
  releaseDate?: string;
  shows: Show[];
}

export interface CollectionGroup {
  _id: string;
  name: string;
  description: string;
  group: boolean;
  collections: Collection[];
}
