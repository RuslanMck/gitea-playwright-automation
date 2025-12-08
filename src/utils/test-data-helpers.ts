import type { TestUser } from "../fixtures/api-fixtures.js";

export function getTestsPostfix(): string {
    const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`.slice(-6);
    const testPostfix: string = `qa${uniqueId}`;
    return testPostfix;
}

export function generateTestUserData(): TestUser {
    const postfix = getTestsPostfix();

    return {
        username: `TestUser_${postfix}`,
        email: `test_${postfix}@yopmail.com`,
        password: process.env.TEST_PASSWORD!
    };
}

export function getAdminUser(): TestUser {
    return {
        username: process.env.ADMIN_USER_NAME!,
        email: process.env.ADMIN_USER_NAME!,
        password: process.env.ADMIN_PASSWORD!
    };
}