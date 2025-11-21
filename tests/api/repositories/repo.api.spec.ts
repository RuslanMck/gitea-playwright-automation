import { test, expect } from '../../../src/fixtures/api-fixtures.js';
import { NotFoundRepoOwnerSchema, NotFoundRepoSchema, SingleRepoResponseSchema } from '../../../src/schemas/repo-schemas.js';
import { parseResponseUsingZod } from '../../../src/utils/api-helpers.js';
import { getTestsPostfix } from '../../../src/utils/test-data-helpers.js';

test.describe('Repo API tests', () => {
    const username = process.env.ADMIN_USER_NAME!;

    test('GET repo - returns 200 when repo exists', { tag: ['@api', '@smoke', '@repo', '@p0'] }, async ({ repoService, cleanupTestRepos, setupTestRepos }) => {
        await setupTestRepos.createRepos(1);
        const reposList = await setupTestRepos.getCreatedRepos();
        const repoName = reposList.at(0)!;
        const response = await repoService.getRepo(username, repoName);
        const repository = await parseResponseUsingZod(response, SingleRepoResponseSchema);

        expect(repository.owner.login).toBe(username);
        expect(repository.name).toBe(repoName);
        expect(repository.full_name).toBe(`${username}/${repoName}`);

        await cleanupTestRepos([repoName], username);
    });

    test('GET repo - returns 404 when repository is not found', { tag: ['@api', '@regression', '@repo', '@p1'] }, async ({ repoService }) => {
        const repoName = `invalidRepoName_${getTestsPostfix()}`
        const response = await repoService.getRepo(username, repoName);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, NotFoundRepoSchema);
        expect(parsedResponse.message).toContain("The target couldn't be found.");
    });

    test('GET repo - returns 404 when repository owner is not found', { tag: ['@api', '@regression', '@repo', '@p1'] }, async ({ repoService, cleanupTestRepos, setupTestRepos }) => {
        const repoName = `invalidRepoName_${getTestsPostfix()}`;
        const username = `userName_${getTestsPostfix()}`;
        const response = await repoService.getRepo(username, repoName);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, NotFoundRepoOwnerSchema);
        expect(parsedResponse.errors[0]).toContain(`user redirect does not exist [name: ${username.toLocaleLowerCase()}]`);
    });

    test('DELETE repo - returns 204 when repository is deleted successfully', { tag: ['@api', '@smoke', '@repo', '@p0'] }, async ({ repoService, setupTestRepos }) => {
        const repoCount = 5;
        await setupTestRepos.createRepos(repoCount);
        const allRepoNames = setupTestRepos.getCreatedRepos();

        for (const name of allRepoNames) {
            const response = await repoService.deleteRepo(username, name);
            expect(response.status()).toBe(204);
        }
    });

    test('DELETE repo - returns 404 when repository is not found', { tag: ['@api', '@regression', '@repo', '@p1'] }, async ({ repoService }) => {
        const repoName = `invalidRepoName_${getTestsPostfix()}`
        const response = await repoService.deleteRepo(username, repoName);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, NotFoundRepoSchema);
        expect(parsedResponse.message).toContain("The target couldn't be found.");
    });

    test('DELETE repo - returns 404 when repository owner is not found', { tag: ['@api', '@regression', '@repo', '@p1'] }, async ({ repoService, cleanupTestRepos, setupTestRepos }) => {
        const repoName = `invalidRepoName_${getTestsPostfix()}`;
        const username = `userName_${getTestsPostfix()}`;
        const response = await repoService.deleteRepo(username, repoName);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, NotFoundRepoOwnerSchema);
        expect(parsedResponse.errors[0]).toContain(`user redirect does not exist [name: ${username.toLocaleLowerCase()}]`);
    });

});