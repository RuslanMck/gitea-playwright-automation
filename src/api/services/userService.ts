import { MultipleReposResponseSchema, SingleRepoResponseSchema, type SingleRepoResponse, type MultipleReposResponse } from "../../schemas/repoSchemas.js";
import { UserResponseSchema,type User } from "../../schemas/userSchemas.js";
import { EmailsResponseSchema, type EmailResponse } from "../../schemas/emailSchemas.js";
import { USER_ENDPOINTS, USER_SELF_ENDPOINTS } from "../endpoints.js";
import type { BaseApiClient } from "./baseApiClient.js";
import { AccessTokenSchema, type AccessToken } from "../../schemas/tokenSchemas.js";


export class UserService {
    constructor(private readonly api: BaseApiClient) { }

    async getUserByUsername(username: string): Promise<User | null> {
        const response = await this.api.get(USER_ENDPOINTS.byUserName(username));

        if (response.status() === 400) {
            return null;
        }
        if (!response.ok()) {
            throw new Error(`getUserByUsername failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = UserResponseSchema.parse(responseJson);

        return parsedResponse;
    }

    async getUserByUsernameRaw(username: string) {
        const response = await this.api.get(USER_ENDPOINTS.byUserName(username));
        return response;
    }

    async createUserRepo(repoName: string): Promise<SingleRepoResponse | null> {
        const createRepoBody = { name: repoName };
        const response = await this.api.post(USER_SELF_ENDPOINTS.repos, createRepoBody);

        if (!response.ok()) {
            throw new Error(`createUserRepo failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = SingleRepoResponseSchema.parse(responseJson);
        return parsedResponse;
    }

    async createUserRepoRaw(repoName: string) {
        const createRepoBody = { name: repoName };
        const response = await this.api.post(USER_SELF_ENDPOINTS.repos, createRepoBody);

        const responseJson = await response.json();

        return responseJson;

    }

    async getAllUserRepos(username: string): Promise<MultipleReposResponse | null> {
        const response = await this.api.get(USER_ENDPOINTS.allUserRepos(username));

        if (!response.ok()) {
            throw new Error(`getAllUserRepos failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = MultipleReposResponseSchema.parse(responseJson);
        return parsedResponse;
    }

    async addUserEmail(emails: string[]): Promise<EmailResponse | null> {
        const body = { emails };
        const response = await this.api.post(USER_SELF_ENDPOINTS.emails, body);

        if (!response.ok()) {
            throw new Error(`addUserEmail failed with status: ${response.status()}`);
        }
        const responseJson = await response.json();
        const parsedResponse = EmailsResponseSchema.parse(responseJson);
        return parsedResponse;
    }

    async deleteUserEmail(emails: string[]) {
        const body = { emails };
        const response = await this.api.delete(USER_SELF_ENDPOINTS.emails, body);

        if (!response.ok()) {
            throw new Error(`deleteUserEmail failed with status: ${response.status()}`);
        }

        return response;

    }

    async addUserAccessToken(username: string, password: string, tokenName: string, scopes: string[]): Promise<AccessToken> {
        const body = { name: tokenName, scopes };

        // Create Basic Auth header
        const formattedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        const headers = {
            'Authorization': `Basic ${formattedCredentials}`
        };

        const response = await this.api.post(USER_ENDPOINTS.postUserAccessToken(username), body, headers);

        if (!response.ok()) {
            throw new Error(`addUserAccessToken failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = AccessTokenSchema.parse(responseJson);
        return parsedResponse;
    }

    async deleteUserAccessToken(username: string, password: string, tokenName: string) {
        const formattedCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        const headers = {
            'Authorization': `Basic ${formattedCredentials}`
        };

        const response = await this.api.delete(USER_ENDPOINTS.deleteUserAccessToken(username, tokenName), {} ,headers);
        
        if (!response.ok()) {
            throw new Error(`deleteUserAccessToken failed with status: ${response.status()}`);
        }

        return response;
    }
}