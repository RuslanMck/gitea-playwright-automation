import { test as base, request } from '@playwright/test'
import { BaseApiClient } from "../api/services/base-api-client.js"
import { UserService } from '../api/services/user-service.js';
import { RepoService } from '../api/services/repo-service.js';
import { AdminService } from '../api/services/admin-service.js';
import { generateTestUserData, getTestsPostfix } from '../utils/test-data-helpers.js';


type ApiFixtures = {
    baseApiClient: BaseApiClient;
    userService: UserService;
    repoService: RepoService;
    adminService: AdminService;
    setupSingleTestUser: TestUser;
    cleanupSingleTestUser: (testUser: TestUser) => void;
    setupMultipleTestUsers: {
        createUsers: (userCount: number) => void;
        getCreatedUsers: () => TestUser[];
    };
    cleanupMultipleTestUsers: (usersList: TestUser[]) => void;
    setupTestRepos: {
        createRepos: (repoCount: number) => void;
        getCreatedRepos: () => string[];
    };
    cleanupTestRepos: (reposList: string[], username: string) => void;
    setupMultipleTestEmails: {
        createEmails: (emailsCount: number) => void;
        getCreatedEmails: () => string[];
    };
    cleanupMultipleTestEmails: (emailsList: string[]) => void;
    setupTestToken: (username: string, password: string, tokenName: string, scope: string[]) => Promise<void>;
    cleanupTestToken: (username: string, password: string, tokenName: string) => void;
    deleteAllTestUsers: () => void;
};

export const apiFixtures = base.extend<ApiFixtures>({

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

    setupSingleTestUser: async ({ adminService }, use) => {
        const testUser: TestUser = generateTestUserData();
        const response = await adminService.createUser(testUser.email, testUser.username, testUser.password);
        if (!response.ok()) {
            console.warn(`Failed to create test user ${testUser.username}. Status: ${response.status()}`);
        }
        await use(testUser);
    },

    cleanupSingleTestUser: async ({ adminService }, use) => {
        const usersToDelete: TestUser[] = [];

        const deleteQueue = (testUser: TestUser) => {
            usersToDelete.push(testUser);
        }

        await use(deleteQueue);

        for (const testUser of usersToDelete) {
            console.debug(`[DEBUG LOG] User ${testUser.username}; ${testUser.email} is DELETED.`);
            const response = await adminService.deleteUser(testUser.username);
            if (!response.ok()) {
                console.warn(`Failed to delete test user: ${testUser.username}. Status: ${response.status()}`);
            }
        }

    },

    setupMultipleTestUsers: async ({ adminService }, use) => {

        const userList: TestUser[] = [];

        const createUsers = async (userCount: number) => {
            for (let i = 0; i < userCount; i++) {

                const testUser = generateTestUserData();
                const username = testUser.username;
                const email = testUser.email;
                const password = testUser.password;

                userList.push(testUser);
                const response = await adminService.createUser(email, username, password);

                if (!response.ok()) {
                    throw new Error(`Failed to create test user: ${response.status()}`);
                }
            }
        }

        const getCreatedUsers = () => userList;

        await use({ createUsers, getCreatedUsers });
    },

    cleanupMultipleTestUsers: async ({ adminService }, use) => {
        let usersToClean: TestUser[] = [];

        const trackUserForCleanup = (usersList: TestUser[]) => {
            usersToClean = usersList;
        }

        await use(trackUserForCleanup);

        for (const user of usersToClean) {
            const response = await adminService.deleteUser(user.username);
            if (!response.ok()) {
                console.warn(`Failed to delete test user: ${response.status()}`);
            }
        }
    },

    setupTestRepos: async ({ userService }, use) => {
        const repoNamesList: string[] = [];

        const createRepos = async (repoCount: number) => {

            for (let i = 0; i < repoCount; i++) {
                const repoName = `${process.env.TEST_REPO_NAME}_${getTestsPostfix()}`;
                repoNamesList.push(repoName);
                const response = await userService.createUserRepo(repoName);

                if (!response.ok()) {
                    throw new Error(`Failed to create test repo: ${response.status()}`);
                }
            }
        };

        const getCreatedRepos = () => repoNamesList;

        await use({ createRepos, getCreatedRepos });
    },

    cleanupTestRepos: async ({ repoService }, use) => {

        const cleanupRepos = async (repoNamesList: string[], username: string) => {

            for (const repo of repoNamesList) {

                const response = await repoService.deleteRepo(username, repo)

                if (!response.ok()) {
                    throw new Error(`Failed to delete test repos: ${response.status()}`);
                }
            }
        }

        await use(cleanupRepos);
    },

    setupMultipleTestEmails: async ({ userService }, use) => {
        const emailsList: string[] = [];

        const createEmails = async (emailsCount: number) => {
            for (let i = 0; i < emailsCount; i++) {
                const email = generateTestUserData().email;
                emailsList.push(email);
            }

            const response = await userService.addUserEmail(emailsList);

            if (!response.ok()) {
                throw new Error(`Failed to add emails: ${response.status()}`);
            }
        }

        const getCreatedEmails = () => emailsList;

        await use({ createEmails, getCreatedEmails });
    },

    cleanupMultipleTestEmails: async ({ userService }, use) => {
        let emailsToClean: string[] = [];

        const trackEmailsForCleanup = (emailsList: string[]) => {
            emailsToClean = emailsList;
        }

        await use(trackEmailsForCleanup);

        const response = await userService.deleteUserEmail(emailsToClean);
        if (!response.ok()) {
            console.warn(`Failed to delete test user: ${response.status()}`);
        }

    },

    setupTestToken: async ({ userService }, use) => {
        const tokensCreated: Array<{ username: string, password: string, tokenName: string }> = [];

        const createToken = async (username: string, password: string, tokenName: string, scope: string[]) => {
            const response = await userService.addUserAccessToken(username, password, tokenName, scope);

            if (!response.ok()) {
                throw new Error(`Failed to create token "${tokenName}": ${response.status()}`);
            }

            tokensCreated.push({ username, password, tokenName });
        }

        await use(createToken);
    },

    cleanupTestToken: async ({ userService }, use) => {
        const tokensToClean: Array<{ username: string, password: string, tokenName: string }> = [];

        const trackTokenForCleanup = (username: string, password: string, tokenName: string) => {
            tokensToClean.push({ username, password, tokenName });
        }

        await use(trackTokenForCleanup);

        for (const { username, password, tokenName } of tokensToClean) {
            const response = await userService.deleteUserAccessToken(username, password, tokenName);
            if (!response.ok()) {
                console.warn(`Failed to delete token "${tokenName}": ${response.status()}`);
            }
        }
    },

    deleteAllTestUsers: async ({ adminService }, use) => {

        await use(async () => {
            const response = await adminService.getAllUsers();

            if (!response.ok()) {
                console.warn(`Failed to get users: ${response.status()}`);
                return;
            }

            const users: TestUser[] = await response.json();
            console.debug(`[DELETE ALL LOG] All users count ${users.length}`)

            const testUsers = users.filter(user =>
                user.username.toLowerCase().includes('testuser') ||
                user.username.toLowerCase().includes('_test_')
            );

            console.debug(`[DELETE ALL LOG] All test users count ${testUsers.length}`)
            for (const user of testUsers) {
                console.debug(`[DEBUG LOG] deleteAllTestUsers: user to delete: ${user.username}`)

                const deleteResponse = await adminService.deleteUser(user.username);
                if (!deleteResponse.ok()) {
                    console.warn(`Failed to delete test user "${user.username}": ${deleteResponse.status()}`);
                }
            }
        })

    }



});

export type TestUser = {
    username: string;
    email: string;
    password: string;
};


export { expect } from '@playwright/test';