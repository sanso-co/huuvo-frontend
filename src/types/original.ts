export interface OriginalType {
    _id: string;
    hasOriginalWork: boolean;
    title: string;
    original_title: string;
    type: string;
    published_year?: number;
    author: {
        id: number;
        job: string;
        name: string;
        original_name: string;
    };
}
