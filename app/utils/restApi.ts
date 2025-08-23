export interface FetchReq_t {
    endpoint: string;
    request: RequestInit;
}

interface TypedResponse<T> {
    status: number;
    blob?: T;
    error?: string;
}

export function getDefaultFetchReq(method: RequestInit["method"], body: any): RequestInit {
    return {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body,
    }
}

export async function fetchWithType<T>(req: FetchReq_t): Promise<TypedResponse<T>> {
    try {
        const response = await fetch(req.endpoint, req.request);
        if (!response.ok) {
            console.error("Error fetching data: ", response.status);
            return {
                status: response.status,
                error: "Error fetching data",
            };
        }
        const responseData = await response.json() as T;
        return {
            status: response.status,
            blob: responseData,
        };
    } catch (error) {
        console.error("Error fetching data: ", error);
        return {
            status: 500,
            error: "Fatal error: " + error
        };
    }
}