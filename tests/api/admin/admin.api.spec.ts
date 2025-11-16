import { expect, test } from "../../../src/fixtures/api-fixtures.js";

test.describe('Admin API tests', () => {

    const username = 'TestUserAutomation2';
    const email = 'test8849email+8@yopmail.com';
    const password = '123qweQWE';

    test('Create user', async ({ adminService }) => {
        const response = await adminService.createUser(email, username, password);

        console.log(response);
        expect(response.login).toBe(username);
        expect(response.email).toBe(email);
    });

    test('Delete User', async ({ adminService }) => {
        const response = await adminService.deleteUser(username);

        console.log(response);
        expect(response.status()).toBe(204);
    });

});