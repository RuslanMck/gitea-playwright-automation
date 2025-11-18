import { expect, test } from "../../../src/fixtures/api-fixtures.js";
import { UserResponseSchema } from "../../../src/schemas/user-schemas.js";
import { parseResponseUsingZod } from "../../../src/utils/api-helpers.js";
import { getTestsPostfix } from "../../../src/utils/test-data-helpers.js";

test.describe('Admin API tests', () => {

    const password = process.env.TEST_PASSWORD!;

    test('should create user successfully when valid data is provided', async ({ adminService, cleanupTestUser }) => {
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

    test('should delete user successfully when user exists', async ({ adminService, setupTestUser }) => {
        const username = setupTestUser.username;

        const response = await adminService.deleteUser(username);
        expect(response.status()).toBe(204);
    });
});