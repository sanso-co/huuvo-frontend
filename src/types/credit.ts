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

export interface CastType {
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    profile_path: string;
    roles: [
        {
            character: string;
        }
    ];
    order: number;
}

export interface PersonType {
    id: number;
    name: string;
    profile_path: string;
    biography: string;
    also_known_as: string[];
    known_for_department: string;
}
