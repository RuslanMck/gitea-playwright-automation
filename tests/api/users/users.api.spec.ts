import { test, expect } from '../../../src/fixtures/api-fixtures.js';

test.describe('Test GET user request', () => {

    test('Test', async ({ userService }) => {
        const username = process.env.ADMIN_USER_NAME!;
        const userResponse = await userService.getUserByUsername(username);

        expect(userResponse).not.toBeNull();
        expect(userResponse?.login).toBe(username);
    });

    test('getAllUserRepos', async ({ userService }) => {
        const username = process.env.ADMIN_USER_NAME!;
        const allUsersReposResponse = await userService.getAllUserRepos(username);

        expect(allUsersReposResponse).not.toBeNull();
    });

    test('Add email', async ({ userService }) => {
        const emails = ["uthertester+Automation6@gmail.com", "uthertester+Automation7@gmail.com"];
        const response = await userService.addUserEmail(emails);

        console.log(response);
        expect(response).not.toBeNull();
        const responseEmails = response!.map(singleEmail => singleEmail.email);
        expect(responseEmails).toEqual(expect.arrayContaining(emails));

    });

    test('Delete emails', async ({ userService }) => {
        const emails = ["uthertester+Automation6@gmail.com", "uthertester+Automation7@gmail.com"];
        const response = await userService.deleteUserEmail(emails);

        console.log(response);
        expect(response.status()).toBe(204);
    })

    test('Add Access Token', async ({ userService }) => {
        const username = process.env.ADMIN_USER_NAME!;
        const password = process.env.ADMIN_PASSWORD!;
        const scopes = ["all"];
        const tokenName = "testTokenFromAutomation5"
        const response = await userService.addUserAccessToken(username, password, tokenName, scopes);

        console.log(response);
        expect(response.name).toBe(tokenName)
    });

    test('Delete Access Token', async ({ userService }) => {
        const username = process.env.ADMIN_USER_NAME!;
        const password = process.env.ADMIN_PASSWORD!;
        const tokenName = "testTokenFromAutomation5"

        const response = await userService.deleteUserAccessToken(username, password, tokenName);

        console.log(response);
        expect(response.status()).toBe(204);
    });
});