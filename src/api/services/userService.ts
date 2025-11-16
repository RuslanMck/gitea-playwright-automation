import { MultipleReposResponseSchema, SingleRepoResponseSchema, type CreateRepoResponse, type GetAllUserReposResponse } from "../../schemas/repoSchemas.js";
import { UserResponseSchema, type User } from "../../schemas/userSchemas.js";
import { USER_ENDPOINTS } from "../endpoints.js";
import type { BaseApiClient } from "./baseApiClient.js";


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

    async createUserRepo(repoName: string): Promise<CreateRepoResponse | null> {
        const createRepoBody = { name: repoName };
        const response = await this.api.post(USER_ENDPOINTS.repos, createRepoBody);

        if (response.status() === 400) {
            return null;
        }
        if (!response.ok()) {
            throw new Error(`createUserRepo failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = SingleRepoResponseSchema.parse(responseJson);
        return parsedResponse;
    }

    async createUserRepoRaw(repoName: string) {
        const createRepoBody = { name: repoName };
        const response = await this.api.post(USER_ENDPOINTS.repos, createRepoBody);

        const responseJson = await response.json();

        return responseJson;

    }

    async getAllUserRepos(username: string): Promise<GetAllUserReposResponse | null> {
        const response = await this.api.get(USER_ENDPOINTS.allUserRepos(username));

        if (response.status() === 400) {
            return null;
        }
        if (!response.ok()) {
            throw new Error(`getAllUserRepos failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = MultipleReposResponseSchema.parse(responseJson);
        return parsedResponse;
    }
}