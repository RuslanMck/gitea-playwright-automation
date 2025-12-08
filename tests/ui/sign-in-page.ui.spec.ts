import { PAGE_PATHS } from '../../src/constants/page-paths.js';
import { VALIDATION_MESSAGES } from '../../src/constants/validation-messages.js';
import { expect, test } from '../../src/fixtures/ui-api-fixtures.js'
import { generateTestUserData } from '../../src/utils/test-data-helpers.js';

test.describe('Sign In page tests', () => {
    const username = process.env.ADMIN_USER_NAME!
    const password = process.env.ADMIN_PASSWORD!
    const email = process.env.ADMIN_EMAIL!
    const testUser = generateTestUserData();
    const nonExistentPassword = testUser.password + Date.now();
    const nonExistentEmail = testUser.email;

    test('Sign In - user is signed in with valid username', { tag: ['@ui', '@smoke', '@signIn', '@p0'] }, async ({ signInPage, dashboardPage, page }) => {
        await signInPage.open();
        await signInPage.signIn(username, password);

        await expect(page).toHaveURL(PAGE_PATHS.DASHBOARD_PAGE);
        await expect(dashboardPage.dashboardOwnerName).toHaveText(username);
        await expect(dashboardPage.dashboardRepoList).toBeVisible();
    });

    test('Sign In - user is signed in with valid email', { tag: ['@ui', '@smoke', '@signIn', '@p0'] }, async ({ signInPage, dashboardPage, page }) => {
        await signInPage.open();
        await signInPage.signIn(email, password);

        await expect(page).toHaveURL(PAGE_PATHS.DASHBOARD_PAGE);
        await expect(dashboardPage.dashboardOwnerName).toHaveText(username);
        await expect(dashboardPage.dashboardRepoList).toBeVisible();
    });

    test('Sign In - validation error is displayed with empty username/email field', { tag: ['@ui', '@regression', '@signIn', '@p1'] }, async ({ signInPage }) => {
        await signInPage.open();
        await signInPage.fillUsernameOrEmail('');
        await signInPage.fillPassword(password);
        await signInPage.clickSignInButton();

        await expect(signInPage.usernameOrEmailInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.REQUIRED_FIELD);
    });

    test('Sign In - validation error is displayed with empty password field', { tag: ['@ui', '@regression', '@signIn', '@p1'] }, async ({ signInPage }) => {
        await signInPage.open();
        await signInPage.fillUsernameOrEmail(email);
        await signInPage.fillPassword('');
        await signInPage.clickSignInButton();

        await expect(signInPage.passwordInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.REQUIRED_FIELD);
    });

    test('Sign In - validation error is displayed with non-existent username/email or password field', { tag: ['@ui', '@regression', '@signIn', '@p1'] }, async ({ signInPage }) => {
        await signInPage.open();
        await signInPage.signIn(nonExistentEmail, nonExistentPassword);

        await expect(signInPage.validationFlashError).toBeVisible();
        await expect(signInPage.validationFlashError).toHaveText(VALIDATION_MESSAGES.INCORRECT_CREDENTIALS);
    });

    test('Sign In - validation error is displayed with correct username but wrong password', { tag: ['@ui', '@regression', '@signIn', '@p1'] }, async ({ signInPage }) => {
        await signInPage.open();
        await signInPage.signIn(username, nonExistentPassword);


        await expect(signInPage.validationFlashError).toBeVisible();
        await expect(signInPage.validationFlashError).toHaveText(VALIDATION_MESSAGES.INCORRECT_CREDENTIALS);
    });

    test('Sign In - validation error is displayed with correct email but wrong password', { tag: ['@ui', '@regression', '@signIn', '@p1'] }, async ({ signInPage }) => {
        await signInPage.open();
        await signInPage.signIn(email, nonExistentPassword);

        await expect(signInPage.validationFlashError).toBeVisible();
        await expect(signInPage.validationFlashError).toHaveText(VALIDATION_MESSAGES.INCORRECT_CREDENTIALS);
    });


    test('Sign In - forgot password page opens after clicking correspondent link', { tag: ['@ui', '@regression', '@signIn', '@p1'] }, async ({ signInPage, forgotPassPage, page }) => {
        await signInPage.open();
        await signInPage.clickForgotPass();

        await expect(page).toHaveURL(PAGE_PATHS.FORGOT_PASS_PAGE);
        await expect(forgotPassPage.pageTitle).toContainText('Forgot Password');
    });
});