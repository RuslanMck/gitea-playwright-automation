import { UserResponseSchema, type User } from "../../schemas/userSchemas.js";
import { ADMIN_ENDPOINTS } from "../endpoints.js";
import type { BaseApiClient } from "./baseApiClient.js";

export class AdminService {
    constructor(private readonly api: BaseApiClient) { }

    async createUser(email: string, username: string, password: string): Promise<User> {
        const body = { email: email, password: password, username: username };
        const response = await this.api.post(ADMIN_ENDPOINTS.user, body);

        if (!response.ok()) {
            throw new Error(`createUser failed with status: ${response.status()}`);
        }

        const responseJson = await response.json();
        const parsedResponse = UserResponseSchema.parse(responseJson);

        return parsedResponse;
    }

    async deleteUser(username: string){
        const response = await this.api.delete(ADMIN_ENDPOINTS.deleteUser(username));

        if (!response.ok()) {
            throw new Error(`createUser failed with status: ${response.status()}`);
        }

        return response;

    }


}