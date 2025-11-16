import { test, expect } from '../../../src/fixtures/api-fixtures.js';

test.describe('Repo api tests', () => {

    test('Get repo info', async ({repoService}) => {
        const username = process.env.ADMIN_USER_NAME!;
        const repoName = process.env.REPO_NAME!;

        const response = await repoService.getRepo(username, repoName);

        expect(response.owner.login).toBe(username);
        expect(response.name).toBe(repoName);
        expect(response.full_name).toBe(`${username}/${repoName}`);
    });

    test('Delete repo', async ({repoService}) => {
        const username = process.env.ADMIN_USER_NAME!;
        const repoName = process.env.REPO_NAME!;
        const response = await repoService.deleteRepo(username, repoName);

        console.log(response);
        expect(response.status()).toBe(204);
    });
});