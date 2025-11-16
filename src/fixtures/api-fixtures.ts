import {test as base, request} from '@playwright/test'
import { BaseApiClient } from "../api/services/baseApiClient.js"
import { UserService } from '../api/services/userService.js';


type ApiFixtures = {
    baseApiClient: BaseApiClient;
    userService: UserService;
};

export const test = base.extend<ApiFixtures>({

baseApiClient: async ({ request }, use) => {

    const baseUrl = process.env.GITEA_API_BASE_URL!;
    const apiClient = new BaseApiClient(request, baseUrl);
    const adminToken = process.env.ADMIN_API_TOKEN;

    if(adminToken){
        apiClient.setAuthToken(adminToken);
    }

    await use(apiClient);
},

userService: async ({baseApiClient}, use) => {
    await use (new UserService(baseApiClient));
},

});

export { expect } from '@playwright/test';