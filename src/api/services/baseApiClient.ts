import type { APIRequestContext, APIResponse } from "@playwright/test";

export class BaseApiClient {
    constructor(
        private readonly request: APIRequestContext,
        private readonly baseUrl: string,
        private authToken?: string
    ) { }

    setAuthToken(token: string) {
        this.authToken = token;
    }

    private buildHeaders(extraHeaders?: Record<string, string>) {
        return {
            'Content-Type': 'application/json',
            ...(this.authToken ? { Authorization: `Bearer ${this.authToken}` } : {}),
            ...extraHeaders,
        };
    }

    private buildURL(path: string, queryParams?: Record<string, string | number>) {
        const url = new URL(path, this.baseUrl);

        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                url.searchParams.set(key, String(value));
            });
        }

        return url.toString();
    }

    async get(path: string, queryParams?: Record<string, string | number>, headers?: Record<string, string>): Promise<APIResponse> {
        const url = this.buildURL(path, queryParams);
        return this.request.get(url, { headers: this.buildHeaders(headers) });
    }

    async post(path: string, body?: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const url = this.buildURL(path);

        return this.request.post(url, {
            data: body,
            headers: this.buildHeaders(headers),
        });
    }

    async put(path: string, body?: unknown, headers?: Record<string, string>): Promise<APIResponse> {
        const url = this.buildURL(path);

        return this.request.put(url, {
            data: body,
            headers: this.buildHeaders(headers),
        });
    }

    async delete(path: string, headers?: Record<string, string>) {
        const url = this.buildURL(path);
        return this.request.delete(url, {
            headers: this.buildHeaders(headers),
        });
    }


}