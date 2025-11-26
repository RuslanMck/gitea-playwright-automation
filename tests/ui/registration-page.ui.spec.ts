import { PAGE_PATHS } from '../../src/constants/page-paths.js';
import { VALIDATION_MESSAGES } from '../../src/constants/validation-messages.js';
import { expect, test } from '../../src/fixtures/ui-api-fixtures.js';
import { generateTestUserData } from '../../src/utils/test-data-helpers.js';

test.describe('Registration page test', () => {

    test.describe('Successful registration', () => {

        test('Registration - user successfully registered with valid data provided', { tag: ['@ui', '@smoke', '@registrationPage', '@p0'] }, async ({ registrationPage, dashboardPage, cleanupSingleTestUser, page }) => {
            const user = generateTestUserData();
            await registrationPage.open();
            await registrationPage.register(user.username, user.email, user.password, user.password);

            await expect(page).toHaveURL(PAGE_PATHS.DASHBOARD_PAGE);
            await expect(dashboardPage.dashboardOwnerName).toHaveText(user.username);
            await expect(dashboardPage.dashboardRepoList).toBeVisible();

            cleanupSingleTestUser(user);
        });

    });

    test.describe('Registration form fields validation', () => {

        test('Registration - validation error is displayed with empty username', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage }) => {
            await registrationPage.open();
            await registrationPage.clickRegistrationButton();
            await expect(registrationPage.usernameInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.REQUIRED_FIELD);
        });

        test('Registration - validation error is displayed with empty email', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage }) => {
            const user = generateTestUserData();
            await registrationPage.open();
            await registrationPage.fillUsername(user.username);
            await registrationPage.clickRegistrationButton();
            await expect(registrationPage.emailInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.REQUIRED_FIELD);
        });

        test('Registration - validation error is displayed with invalid email', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage }) => {
            const user = generateTestUserData();
            const invalidEmail = `email`;
            await registrationPage.open();
            await registrationPage.fillUsername(user.username);
            await registrationPage.fillEmail(invalidEmail);
            await registrationPage.clickRegistrationButton();
            await expect(registrationPage.emailInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.EMAIL.MISSING_AT(invalidEmail));
        });

        test('Registration - validation error is displayed with incomplete email', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage }) => {
            const user = generateTestUserData();
            const invalidEmail = `email@`;
            await registrationPage.open();
            await registrationPage.fillUsername(user.username);
            await registrationPage.fillEmail(invalidEmail);
            await registrationPage.clickRegistrationButton();
            await expect(registrationPage.emailInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.EMAIL.INCOMPLETE(invalidEmail));
        });

        test('Registration - validation error is displayed with empty password', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage }) => {
            const user = generateTestUserData();
            await registrationPage.open();
            await registrationPage.fillUsername(user.username);
            await registrationPage.fillEmail(user.email);
            await registrationPage.clickRegistrationButton();
            await expect(registrationPage.passwordInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.REQUIRED_FIELD);
        });

        test('Registration - validation error is displayed with empty confirm password', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage }) => {
            const user = generateTestUserData();
            await registrationPage.open();
            await registrationPage.fillUsername(user.username);
            await registrationPage.fillEmail(user.email);
            await registrationPage.fillPassword(user.password);
            await registrationPage.clickRegistrationButton();
            await expect(registrationPage.passwordConfirmInput).toHaveJSProperty('validationMessage', VALIDATION_MESSAGES.REQUIRED_FIELD);
        });

    });

    test.describe('Server-side validation', () => {

        test('Registration - validation error is displayed with username is already used', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage, setupSingleTestUser, cleanupSingleTestUser }) => {
            const user = await setupSingleTestUser;
            const uniqueEmail = generateTestUserData().email;
            await registrationPage.open();
            await registrationPage.register(user.username, uniqueEmail, user.password, user.password);

            await expect(registrationPage.validationFlashError).toBeVisible();
            await expect(registrationPage.validationFlashError).toHaveText(VALIDATION_MESSAGES.USERNAME_TAKEN);

            cleanupSingleTestUser(user);

        });

        test('Registration - validation error is displayed with email is already used', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage, setupSingleTestUser, cleanupSingleTestUser }) => {
            const user = await setupSingleTestUser;
            const uniqueUsername = generateTestUserData().username;
            await registrationPage.open();
            await registrationPage.register(uniqueUsername, user.email, user.password, user.password);

            await expect(registrationPage.validationFlashError).toBeVisible();
            await expect(registrationPage.validationFlashError).toHaveText(VALIDATION_MESSAGES.EMAIL_USED);
            cleanupSingleTestUser(user);

        });

        test('Registration - validation error is displayed with password mismatch', { tag: ['@ui', '@regression', '@registrationPage', '@p1'] }, async ({ registrationPage, setupSingleTestUser, cleanupSingleTestUser }) => {
            const user = generateTestUserData();
            await registrationPage.open();
            await registrationPage.register(user.username, user.email, `${user.password}!qwe`, user.password);

            await expect(registrationPage.validationFlashError).toBeVisible();
            await expect(registrationPage.validationFlashError).toHaveText(VALIDATION_MESSAGES.PASSWORD_MISMATCH);

        });

    });

});