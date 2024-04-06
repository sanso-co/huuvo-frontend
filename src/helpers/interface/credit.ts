import { Show } from "./show";

export interface Person {
  id: number;
  name: string;
  also_known_as: string[];
  known_for_department: string;
  biography: string;
}

export interface Crew {
  credit_id: string;
  id: number;
  jobs: [
    {
      job: string;
    }
  ];
  name: string;
}

export interface CreditShow extends Show {
  job: string;
  credit_id: string;
}
