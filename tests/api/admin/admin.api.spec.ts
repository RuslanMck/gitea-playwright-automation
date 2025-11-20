import { expect, test } from "../../../src/fixtures/api-fixtures.js";
import { UserErrorResponse, UserResponseSchema } from "../../../src/schemas/user-schemas.js";
import { parseResponseUsingZod } from "../../../src/utils/api-helpers.js";
import { generateTestUserData, getTestsPostfix } from "../../../src/utils/test-data-helpers.js";

test.describe('Admin API tests', () => {

    const password = process.env.TEST_PASSWORD!;

    test('POST user - returns 201 when user is created', { tag: ['@api', '@smoke', '@admin', '@p0'] }, async ({ adminService, cleanupSingleTestUser }) => {
        const testUser = generateTestUserData();
        const username = testUser.username;
        const email = testUser.email;
        const response = await adminService.createUser(email, username, password);

        expect(response.status()).toBe(201);

        const user = await parseResponseUsingZod(response, UserResponseSchema);

        expect(user.login).toBe(username);
        expect(user.email).toBe(email);

        cleanupSingleTestUser(testUser);
    });

    test('POST user - returns 422 when email already exists', { tag: ['@api', '@regression', '@admin', '@validation', '@p1'] }, async ({ adminService, cleanupSingleTestUser, setupSingleTestUser }) => {
        const user = await setupSingleTestUser;
        const updatedUsername = user.username + getTestsPostfix();
        const response = await adminService.createUser(user.email, updatedUsername, password);

        expect(response.status()).toBe(422);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`e-mail already in use [email: ${user.email}]`);


        cleanupSingleTestUser(user);
    });

    test('POST user - returns 422 when username already exists', { tag: ['@api', '@regression', '@admin', '@validation', '@p1'] }, async ({ adminService, cleanupSingleTestUser, setupSingleTestUser }) => {
        const user = await setupSingleTestUser;
        const response = await adminService.createUser(user.email, user.username, password);
        expect(response.status()).toBe(422);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`user already exists [name: ${user.username}]`);

        cleanupSingleTestUser(user);
    });

    test('DELETE user - returns 204 when user exists', { tag: ['@api', '@regression', '@admin', '@validation', '@p0'] }, async ({ adminService, setupSingleTestUser }) => {
        const user = await setupSingleTestUser;
        const response = await adminService.deleteUser(user.username);
        expect(response.status()).toBe(204);
    });

    test('DELETE user- returns 404 when user does not exist', { tag: ['@api', '@regression', '@admin', '@validation', '@p1'] }, async ({ adminService }) => {
        const user = generateTestUserData();
        const response = await adminService.deleteUser(user.username);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`user redirect does not exist [name: ${user.username}]`);
    });
});