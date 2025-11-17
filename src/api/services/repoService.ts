import { REPO_ENDPOINTS } from "../endpoints.js";
import type { BaseApiClient } from "./baseApiClient.js";

export class RepoService {
    constructor(private readonly api: BaseApiClient) { }

    async getRepo(username: string, repoName: string) {
        const response = await this.api.get(REPO_ENDPOINTS.getRepo(username, repoName));
        return response;
    }

    async deleteRepo(username: string, repoName: string) {
        const response = await this.api.delete(REPO_ENDPOINTS.getRepo(username, repoName));
        return response;
    }
}