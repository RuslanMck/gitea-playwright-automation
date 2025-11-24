import {expect, test} from '../../src/fixtures/ui-api-fixtures.js';
import { generateTestUserData } from '../../src/utils/test-data-helpers.js';

test.describe('Registration page test', () => {

    test('Registration - user successfully registered with valid data provided', {tag: ['@ui', '@smoke', '@registrationPage', '@p']}, async ({registrationPage, cleanupSingleTestUser, deleteAllTestUsers}) => {
        const user = generateTestUserData();
        await registrationPage.open();
        await registrationPage.fillUsername(user.username);
        await registrationPage.fillEmail(user.email);
        await registrationPage.fillPassword(user.password);
        await registrationPage.fillConfirmPassword(user.password);
        await registrationPage.clickRegistrationButton();
        
        await cleanupSingleTestUser(user);
    });

    test('Registration - validation error is displayed with empty username', {tag: ['@ui', '@regression', '@registrationPage', '@p1']}, async ({registrationPage}) => {
        await registrationPage.open();
        await registrationPage.clickRegistrationButton();
        await expect(registrationPage.usernameInput).toHaveJSProperty('validationMessage', 'Please fill out this field.')
    });
});