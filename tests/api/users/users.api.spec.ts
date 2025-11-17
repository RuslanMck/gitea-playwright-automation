import { test, expect } from '../../../src/fixtures/api-fixtures.js';
import { EmailsResponseSchema } from '../../../src/schemas/emailSchemas.js';
import { AccessTokenSchema } from '../../../src/schemas/tokenSchemas.js';
import { UserResponseSchema } from '../../../src/schemas/userSchemas.js';
import { parseResponseUsingZod } from '../../../src/utils/api-helpers.js';

test.describe('Test GET user request', () => {
    const username = process.env.ADMIN_USER_NAME!;
    const password = process.env.ADMIN_PASSWORD!;

    test('Get user by name', async ({ userService }) => {
        const response = await userService.getUserByUsername(username);
        const user = await parseResponseUsingZod(response, UserResponseSchema);

        console.log(user);

        expect(user).not.toBeNull();
        expect(user.login).toBe(username);
    });

    test('getAllUserRepos', async ({ userService }) => {
        const allUsersReposResponse = await userService.getAllUserRepos(username);

        console.log(await allUsersReposResponse.json());

        expect(allUsersReposResponse).not.toBeNull();
    });

    test('Add email', async ({ userService }) => {
        const emails = ["uthertester+Automation6@gmail.com", "uthertester+Automation7@gmail.com"];
        const response = await userService.addUserEmail(emails);
        const emailsList = await parseResponseUsingZod(response, EmailsResponseSchema)

        console.log(emailsList);
        expect(emailsList).not.toBeNull();
        const responseEmails = emailsList!.map(singleEmail => singleEmail.email);
        expect(responseEmails).toEqual(expect.arrayContaining(emails));
    });

    test('Delete emails', async ({ userService }) => {
        const emails = ["uthertester+Automation6@gmail.com", "uthertester+Automation7@gmail.com"];
        const response = await userService.deleteUserEmail(emails);

        console.log(response);
        expect(response.status()).toBe(204);
    })

    test('Add Access Token', async ({ userService }) => {
        const scopes = ["all"];
        const tokenName = "testTokenFromAutomation5"
        const response = await userService.addUserAccessToken(username, password, tokenName, scopes);
        const token = await parseResponseUsingZod(response, AccessTokenSchema)

        console.log(token);
        expect(token.name).toBe(tokenName)
    });

    test('Delete Access Token', async ({ userService }) => {
        const tokenName = "testTokenFromAutomation5"
        const response = await userService.deleteUserAccessToken(username, password, tokenName);

        console.log(response);
        expect(response.status()).toBe(204);
    });
});