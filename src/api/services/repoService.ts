import { SingleRepoResponseSchema, type SingleRepoResponse } from "../../schemas/repoSchemas.js";
import { REPO_ENDPOINTS } from "../endpoints.js";
import type { BaseApiClient } from "./baseApiClient.js";


export class RepoService {
    constructor(private readonly api: BaseApiClient) { }

    async getRepo(username: string, repoName: string): Promise<SingleRepoResponse> {
        const response = await this.api.get(REPO_ENDPOINTS.getRepo(username, repoName));

        if (!response.ok) {
            throw new Error(`getRepo failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = SingleRepoResponseSchema.parse(responseJson);
        return parsedResponse;
    }

    async deleteRepo(username: string, repoName: string) {

        const response = await this.api.delete(REPO_ENDPOINTS.getRepo(username, repoName));

        if (!response.ok) {
            throw new Error(`deleteRepo failed with status: ${response.status()}`);
        }

        return response;

    }
}