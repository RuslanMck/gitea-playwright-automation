import { expect, test } from "../../../src/fixtures/api-fixtures.js";
import { UserErrorResponse, UserResponseSchema } from "../../../src/schemas/user-schemas.js";
import { parseResponseUsingZod } from "../../../src/utils/api-helpers.js";
import { getTestsPostfix } from "../../../src/utils/test-data-helpers.js";

test.describe('Admin API tests', () => {

    const password = process.env.TEST_PASSWORD!;

    test('should create user successfully when valid data is provided', { tag: ['@api', '@smoke', '@admin', '@p0'] }, async ({ adminService, cleanupTestUser }) => {
        const postfix = getTestsPostfix();
        const username = `TestUser_${postfix}`;
        const email = `test_${postfix}@yopmail.com`;
        const response = await adminService.createUser(email, username, password);
        const user = await parseResponseUsingZod(response, UserResponseSchema);

        expect(response.status()).toBe(201);
        expect(user.login).toBe(username);
        expect(user.email).toBe(email);

        cleanupTestUser(username);
    });

    test('should return 422 when email already exists', { tag: ['@api', '@regression', '@admin', '@validation', '@p1'] }, async ({ adminService, cleanupTestUser, setupTestUser }) => {
        const { username, email, password } = setupTestUser;
        const updatedUsername = username + getTestsPostfix();

        const response = await adminService.createUser(email, updatedUsername, password);
        expect(response.status()).toBe(422);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`e-mail already in use [email: ${email}]`);
        cleanupTestUser(username);
    });

    test('should return 422 when username to be registered already exists', { tag: ['@api', '@regression', '@admin', '@validation', '@p1'] }, async ({ adminService, cleanupTestUser, setupTestUser }) => {
        const { username, email, password } = setupTestUser;

        const response = await adminService.createUser(email, username, password);
        expect(response.status()).toBe(422);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`user already exists [name: ${username}]`);

        cleanupTestUser(username);
    });

    test('should delete user successfully when user exists', { tag: ['@api', '@regression', '@admin', '@validation', '@p0'] }, async ({ adminService, setupTestUser }) => {
        const username = setupTestUser.username;
        const response = await adminService.deleteUser(username);
        expect(response.status()).toBe(204);
    });

    test('should return 404 when user to be deleted not exists', { tag: ['@api', '@regression', '@admin', '@validation', '@p1'] }, async ({ adminService }) => {

        const username = `nonexistent_${getTestsPostfix()}`;
        const response = await adminService.deleteUser(username);
        expect(response.status()).toBe(404);

        const parsedResponse = await parseResponseUsingZod(response, UserErrorResponse);
        expect(parsedResponse.message).toContain(`user redirect does not exist [name: ${username}]`);
    });
});