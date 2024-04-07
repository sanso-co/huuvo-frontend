import { Show } from "./show";

export interface Person {
  id: number;
  name: string;
  also_known_as: string[];
  known_for_department: string;
  biography: string;
}

export interface CastType {
  id: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  roles: [
    {
      character: string;
      credit_id: string;
    }
  ];
}

export interface CrewType {
  credit_id: string;
  id: number;
  jobs: [
    {
      job: string;
    }
  ];
  name: string;
}

export interface ShowAsCast extends Show {
  character: string;
  credit_id: string;
}

export interface ShowAsCrew extends Show {
  job: string;
  credit_id: string;
}

export interface PersonCreditsType {
  cast: ShowAsCast[];
  crew: ShowAsCrew[];
}
