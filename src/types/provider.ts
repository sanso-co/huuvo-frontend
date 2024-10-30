import { Drama } from "./show";

export interface Provider {
    _id?: string;
    name: string;
    description?: string;
    shows: {
        result: Drama[];
        page: number;
        totalPages: number;
        totalDocs: number;
    };
}

export interface ProviderInfo {
    provider_name: string;
    provider_id: number;
    logo_path: string;
    display_priority: number;
}

export interface ProviderItemResponse {
    _id: string;
    id: number;
    name: string;
    logo_path: string;
    display_priority: number;
}
