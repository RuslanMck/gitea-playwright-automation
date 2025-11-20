import { test, expect } from '../../../src/fixtures/api-fixtures.js';
import { SingleRepoResponseSchema } from '../../../src/schemas/repo-schemas.js';
import { parseResponseUsingZod } from '../../../src/utils/api-helpers.js';

test.describe('Repo api tests', () => {
    const username = process.env.ADMIN_USER_NAME!;
    const repoName = process.env.REPO_NAME!;

    test('Create Repo', async ({ userService }) => {
        const response = await userService.createUserRepo(repoName);
        const repo = await parseResponseUsingZod(response, SingleRepoResponseSchema);

        console.log(response);
    });

    test('Get repo info', async ({ repoService }) => {
        const response = await repoService.getRepo(username, repoName);
        const repository = await parseResponseUsingZod(response, SingleRepoResponseSchema);

        expect(repository.owner.login).toBe(username);
        expect(repository.name).toBe(repoName);
        expect(repository.full_name).toBe(`${username}/${repoName}`);
    });

    test('Delete repo', async ({ repoService, userService }) => {

        const allRepos = await userService.getAllUserRepos(username);
        const allReposJson = await allRepos.json();
        const allRepoNames: string[] = allReposJson.map((repo: { name: string }) => repo.name)

        console.log(`Repo length: ${allRepoNames.length}`);

        for (const name of allRepoNames) {
            console.log(`Repo name to be deleted: ${name}`);
            const response = await repoService.deleteRepo(username, name);
            expect(response.status()).toBe(204);

        }
        // const response = await repoService.deleteRepo(username, repoName);

        // console.log(response);
        // expect(response.status()).toBe(204);
    });
});