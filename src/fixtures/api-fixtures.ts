import { test as base, request } from '@playwright/test'
import { BaseApiClient } from "../api/services/base-api-client.js"
import { UserService } from '../api/services/user-service.js';
import { RepoService } from '../api/services/repo-service.js';
import { AdminService } from '../api/services/admin-service.js';
import { getTestsPostfix } from '../utils/test-data-helpers.js';


type ApiFixtures = {
    baseApiClient: BaseApiClient;
    userService: UserService;
    repoService: RepoService;
    adminService: AdminService;
    setupTestUser: TestUser;
    cleanupTestUser: (username: string) => void;
};

export const test = base.extend<ApiFixtures>({

    baseApiClient: async ({ request }, use) => {

        const baseUrl = process.env.GITEA_API_BASE_URL!;
        const apiClient = new BaseApiClient(request, baseUrl);
        const adminToken = process.env.ADMIN_API_TOKEN;

        if (adminToken) {
            apiClient.setAuthToken(adminToken);
        }

        await use(apiClient);
    },

    userService: async ({ baseApiClient }, use) => {
        await use(new UserService(baseApiClient));
    },

    repoService: async ({ baseApiClient }, use) => {
        await use(new RepoService(baseApiClient));
    },

    adminService: async ({ baseApiClient }, use) => {
        await use(new AdminService(baseApiClient));
    },

    setupTestUser: async ({ adminService }, use) => {

        const postfix = getTestsPostfix();
        const username = `TestUser_${postfix}`;
        const email = `test_${postfix}@yopmail.com`;
        const password = process.env.TEST_PASSWORD!;
        const testUser = { username, email, password }

        const response = await adminService.createUser(email, username, password);

        if (response.status() !== 201) {
            throw new Error(`Failed to create test user: ${response.status()}`);
        }

        await use(testUser);
    },

    cleanupTestUser: async ({ adminService }, use) => {
        const usersToCleanup: string[] = [];

        const trackUserForCleanup = (username: string) => {
            usersToCleanup.push(username);
        };

        await use(trackUserForCleanup);

        for (const username of usersToCleanup) {
            const response = await adminService.deleteUser(username);
            if (!response.ok()) {
                console.warn(`Failed to delete test user: ${response.status()}`);
            }
        }
    },
});

type TestUser = {
    username: string;
    email: string;
    password: string;
};


export { expect } from '@playwright/test';