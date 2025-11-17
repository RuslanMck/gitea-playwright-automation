import { ADMIN_ENDPOINTS } from "../endpoints.js";
import type { BaseApiClient } from "./baseApiClient.js";

export class AdminService {
    constructor(private readonly api: BaseApiClient) { }

    async createUser(email: string, username: string, password: string) {
        const body = { email: email, password: password, username: username };
        const response = await this.api.post(ADMIN_ENDPOINTS.user, body);
        return response;
    }

    async deleteUser(username: string) {
        const response = await this.api.delete(ADMIN_ENDPOINTS.deleteUser(username));
        return response;
    }
}