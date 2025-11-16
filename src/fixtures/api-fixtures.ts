import {test as base, request} from '@playwright/test'
import { BaseApiClient } from "../api/services/baseApiClient.js"
import { UserService } from '../api/services/userService.js';
import { RepoService } from '../api/services/repoService.js';
import { AdminService } from '../api/services/adminService.js';


type ApiFixtures = {
    baseApiClient: BaseApiClient;
    userService: UserService;
    repoService: RepoService;
    adminService: AdminService;
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

repoService: async ({baseApiClient}, use) => {
    await use (new RepoService(baseApiClient));
},

adminService: async ({baseApiClient}, use) => {
    await use (new AdminService(baseApiClient));
}

});

export { expect } from '@playwright/test';