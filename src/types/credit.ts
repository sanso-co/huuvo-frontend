export interface CrewType {
    id: number;
    department: string;
    name: string;
    original_name: string;
    jobs: [
        {
            job: string;
        }
    ];
    known_for_department: string;
}

export interface PersonType {
    id: number;
    name: string;
    profile_path: string;
    biography: string;
    also_known_as: string[];
    known_for_department: string;
}
