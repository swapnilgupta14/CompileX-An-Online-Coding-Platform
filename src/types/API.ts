export interface ApiResponse {
    error: boolean;
    responseData: string;
    status_code: number;
}

export interface ApiResponseFormatted<T> {
    error: boolean;
    responseData: T;
    status_code: number;
}

export interface ProblemGetData {
    count: number;
    next: string | null;
    previous: string | null;
    results: Problem[];
}

export interface testcaseType{
    input_case: string,
    output_case: string
    is_public: boolean,
    p_id: string
}

export interface Problem {
    p_id: string;
    p_title: string;
    p_content: string;
    p_author: string;
    p_likes: number;
    p_difficulty: number;
    created_at: string;
}
