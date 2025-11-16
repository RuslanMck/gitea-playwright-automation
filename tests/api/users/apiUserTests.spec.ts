import { test, expect } from '../../../src/fixtures/api-fixtures.js';

test.describe('Test GET user request', () => {

    test('Test', async ({ userService }) => {
        const username = process.env.ADMIN_USER_NAME!;
        const userResponse = await userService.getUserByUsername(username);

        expect(userResponse).not.toBeNull();
        expect(userResponse?.login).toBe(username);
    });

    test('getAllUserRepos', async ({userService}) => {
        const username = process.env.ADMIN_USER_NAME!;
        const allUsersReposResponse = await userService.getAllUserRepos(username);

        expect(allUsersReposResponse).not.toBeNull();
    });
});