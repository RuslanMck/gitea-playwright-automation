import { test, expect } from '../../../src/fixtures/api-fixtures.js';
import { EmailsResponseSchema } from '../../../src/schemas/email-schemas.js';
import { AccessTokenSchema } from '../../../src/schemas/token-schemas.js';
import { UserResponseSchema } from '../../../src/schemas/user-schemas.js';
import { parseResponseUsingZod } from '../../../src/utils/api-helpers.js';

test.describe('User API tests', () => {
    const username = process.env.ADMIN_USER_NAME!;
    const password = process.env.ADMIN_PASSWORD!;

    test('should receive user information when valid user name is provided', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, setupTestUser, cleanupTestUser }) => {
        const user = setupTestUser;
        const response = await userService.getUserByUsername(user.username);

        expect('password' in response).toBe(false);
        expect(response.status()).toBe(200);

        const parsedResponse = await parseResponseUsingZod(response, UserResponseSchema);

        expect(parsedResponse.login).toBe(user.username);
        expect(parsedResponse.email).toBe(user.email);

        cleanupTestUser(user.username);
    });

    test('should receive a lit of user repositories when valid user name is provided', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService, setupTestRepos, cleanupTestRepos }) => {
        await setupTestRepos.createRepos(5);

        const testReposList = await setupTestRepos.getCreatedRepos();
        const allUsersReposResponse = await userService.getAllUserRepos(username);

        expect(allUsersReposResponse).not.toBeNull();

        await cleanupTestRepos(testReposList, username);

    });

    test('should add new email addresses when valid emails are provided', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService }) => {
        const emails = ["uthertester+Automation6@gmail.com", "uthertester+Automation7@gmail.com"];
        const response = await userService.addUserEmail(emails);
        const emailsList = await parseResponseUsingZod(response, EmailsResponseSchema)

        expect(emailsList).not.toBeNull();
        const responseEmails = emailsList!.map(singleEmail => singleEmail.email);
        expect(responseEmails).toEqual(expect.arrayContaining(emails));
    });

    test('should delete email addresses when existed emails are provided', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService }) => {
        const emails = ["uthertester+Automation6@gmail.com", "uthertester+Automation7@gmail.com"];
        const response = await userService.deleteUserEmail(emails);

        expect(response.status()).toBe(204);
    })

    test('should add access token when valid data is provided', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService }) => {
        const scopes = ["all"];
        const tokenName = "testTokenFromAutomation5"
        const response = await userService.addUserAccessToken(username, password, tokenName, scopes);
        const token = await parseResponseUsingZod(response, AccessTokenSchema)

        expect(token.name).toBe(tokenName)
    });

    test('should delete access token when valid data is provided', { tag: ['@api', '@smoke', '@user', '@p0'] }, async ({ userService }) => {
        const tokenName = "testTokenFromAutomation5"
        const response = await userService.deleteUserAccessToken(username, password, tokenName);

        expect(response.status()).toBe(204);
    });
});