import {API_URL} from "@/lib/constants";
import {Todo} from "@/lib/types";

//If we were to use pagination via API
//page: number = 1, limit: number = 10
//const start: number = (page - 1) * limit;
//?_start=${start}&_limit=${limit}

export class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string = 'API error') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

export async function fetchTodos(): Promise<Todo[]> {
    try {
        const response = await fetch(`${API_URL}`, {
            next: { revalidate: 60 },
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new ApiError(
                `Failed to download task list: ${response.statusText}`,
                response.status,
                'Data download error'
            );
        }

        const data = await response.json();

        if (!data || !Array.isArray(data)) {
            throw new ApiError(
                'Invalid data received from API',
                500,
                'Data processing error'
            );
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        console.error('Error downloading tasks:', error);
        throw new ApiError(
            error instanceof Error ? error.message : 'Unexpected network error', 0, 'Connection error'
        );
    }
}
