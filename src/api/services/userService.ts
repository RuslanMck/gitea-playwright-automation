import { USER_ENDPOINTS, USER_SELF_ENDPOINTS } from "../endpoints.js";
import type { BaseApiClient } from "./baseApiClient.js";

export class UserService {
    constructor(private readonly api: BaseApiClient) { }

    async getUserByUsername(username: string) {
        const response = await this.api.get(USER_ENDPOINTS.byUserName(username));
        return response;
    }

    async getUserByUsernameRaw(username: string) {
        const response = await this.api.get(USER_ENDPOINTS.byUserName(username));
        return response;
    }

    async createUserRepo(repoName: string) {
        const createRepoBody = { name: repoName };
        const response = await this.api.post(USER_SELF_ENDPOINTS.repos, createRepoBody);
        return response;
    }

    async createUserRepoRaw(repoName: string) {
        const createRepoBody = { name: repoName };
        const response = await this.api.post(USER_SELF_ENDPOINTS.repos, createRepoBody);
        return response;

    }

    async getAllUserRepos(username: string) {
        const response = await this.api.get(USER_ENDPOINTS.allUserRepos(username));
        return response;
    }

    async addUserEmail(emails: string[]) {
        const body = { emails };
        const response = await this.api.post(USER_SELF_ENDPOINTS.emails, body);
        return response;
    }

    async deleteUserEmail(emails: string[]) {
        const body = { emails };
        const response = await this.api.delete(USER_SELF_ENDPOINTS.emails, body);
        return response;
    }

    async addUserAccessToken(username: string, password: string, tokenName: string, scopes: string[]) {
        const body = { name: tokenName, scopes };

        // Create Basic Auth header
        const formattedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

        const headers = {
            'Authorization': `Basic ${formattedCredentials}`
        };

        const response = await this.api.post(USER_ENDPOINTS.postUserAccessToken(username), body, headers);
        return response;
    }

    async deleteUserAccessToken(username: string, password: string, tokenName: string) {
        const formattedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        const headers = {
            'Authorization': `Basic ${formattedCredentials}`
        };

        const response = await this.api.delete(USER_ENDPOINTS.deleteUserAccessToken(username, tokenName), {}, headers);
        return response;
    }
}