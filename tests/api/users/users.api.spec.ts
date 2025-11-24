import { apiFixtures, expect } from '../../../src/fixtures/api-fixtures.js';
import { EmailsResponseSchema } from '../../../src/schemas/email-schemas.js';
import { MultipleReposResponseSchema } from '../../../src/schemas/repo-schemas.js';
import { AccessTokenSchema } from '../../../src/schemas/token-schemas.js';
import { UserErrorResponse, UserResponseSchema } from '../../../src/schemas/user-schemas.js';
import { parseResponseUsingZod } from '../../../src/utils/api-helpers.js';
import { generateTestUserData, getTestsPostfix } from '../../../src/utils/test-data-helpers.js';

apiFixtures.describe('User API tests', () => {
    const username = process.env.ADMIN_USER_NAME!;
    const password = process.env.ADMIN_PASSWORD!;

    apiFixtures('GET user by name - returns 200 when user exists', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, cleanupSingleTestUser, setupSingleTestUser }) => {
        const user = setupSingleTestUser;
        const response = await userService.getUserByUsername(user.username);

        expect(response.status()).toBe(200);

        const parsedResponse = await parseResponseUsingZod(response, UserResponseSchema);
        expect(parsedResponse).not.toHaveProperty('password');

        expect(parsedResponse.login).toBe(user.username);
        expect(parsedResponse.email).toBe(user.email);

        cleanupSingleTestUser(user);
    });

    apiFixtures('GET user by name - returns 404 when username does not exist', { tag: ['@api', '@regression', '@user', '@validation', '@p1'] }, async ({ userService }) => {
        const user = generateTestUserData();
        const response = await userService.getUserByUsername(user.username);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`user redirect does not exist [name: ${user.username.toLocaleLowerCase()}]`);
    });

    apiFixtures('GET repos - returns 200 when authenticated user has repositories', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, setupTestRepos, cleanupTestRepos }) => {
        const reposCount: number = 5;
        await setupTestRepos.createRepos(reposCount);

        const testReposList = setupTestRepos.getCreatedRepos();
        const response = await userService.getAllUserRepos(username);
        expect(response.status()).toBe(200);

        const parsedResponse = await parseResponseUsingZod(response, MultipleReposResponseSchema);
        expect(parsedResponse.length).toBeGreaterThanOrEqual(reposCount);

        const repoNames = parsedResponse.map(repo => repo.name);
        expect(repoNames).toEqual(expect.arrayContaining(testReposList));

        await cleanupTestRepos(testReposList, username);

    });

    apiFixtures('GET repos - returns 404 when username does not exist', { tag: ['@api', '@regression', '@user', '@validation', '@p1'] }, async ({ userService }) => {
        const user = generateTestUserData();
        const response = await userService.getAllUserRepos(user.username);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`user redirect does not exist [name: ${user.username.toLocaleLowerCase()}]`);
    });

    apiFixtures('POST user email - returns 200 when new email is added successfully', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, setupMultipleTestEmails, cleanupMultipleTestEmails }) => {

        const emailsList: string[] = [];

        for (let i = 0; i < 4; i++) {
            const email = generateTestUserData().email;
            emailsList.push(email);
        }

        const response = await userService.addUserEmail(emailsList);
        expect(response.status()).toBe(201);
        const parsedResponse = await parseResponseUsingZod(response, EmailsResponseSchema)

        const responseEmails = parsedResponse!.map(singleEmail => singleEmail.email);
        expect(responseEmails).toEqual(expect.arrayContaining(emailsList));

        await cleanupMultipleTestEmails(emailsList);
    });

    apiFixtures('DELETE user email - returns 204 when email is deleted successfully', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, setupMultipleTestEmails, cleanupMultipleTestEmails }) => {
        await setupMultipleTestEmails.createEmails(5);
        const emails = setupMultipleTestEmails.getCreatedEmails();
        const response = await userService.deleteUserEmail(emails);

        expect(response.status()).toBe(204);
    })

    apiFixtures('POST access token - returns 200 when new token is added successfully', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, cleanupTestToken }) => {
        const scopes = ["all"];
        const tokenName = `Token${getTestsPostfix()}`;
        const response = await userService.addUserAccessToken(username, password, tokenName, scopes);
        expect(response.status()).toBe(201);
        const token = await parseResponseUsingZod(response, AccessTokenSchema)

        expect(token.name).toBe(tokenName)
        await cleanupTestToken(username, password, tokenName);

    });

    apiFixtures('DELETE access token - returns 204 when token is deleted successfully', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, setupTestToken }) => {
        const scopes = ["all"];
        const tokenName = `Token${getTestsPostfix()}`;

        await setupTestToken(username, password, tokenName, scopes)
        const response = await userService.deleteUserAccessToken(username, password, tokenName);

        expect(response.status()).toBe(204);
    });
});