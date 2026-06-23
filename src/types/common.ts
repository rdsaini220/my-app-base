export interface ImageResponse {
    id: string;
    is_public: boolean;
    url: string;
    mime_type: string;
}

export interface ListResponse<T> {
    items: T[];
    total: number;
    page: number;
    size: number;
    pages: number;
}
