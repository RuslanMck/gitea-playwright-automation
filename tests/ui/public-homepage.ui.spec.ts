import { PAGE_PATHS } from "../../src/constants/page-paths.js";
import { test, expect } from "../../src/fixtures/ui-api-fixtures.js";


test.describe('Public Home Page tests', () => {

    test('Homepage - main page content is displayed after page opening', { tag: ['@ui', '@smoke', '@homepage', '@p0'] }, async ({ publicHomePage }) => {
        await publicHomePage.open();
        await expect(publicHomePage.logo).toBeVisible();
        await expect(publicHomePage.heroTitle).toBeVisible();
        await expect(publicHomePage.heroTitle).toContainText('Gitea');
    });

    test('Homepage - Registration page is opened after clicking correspondent button', { tag: ['@ui', '@smoke', '@homepage', '@p0'] }, async ({ publicHomePage, registrationPage, page }) => {
        await publicHomePage.open();
        await publicHomePage.clickRegisterButton();

        await expect(page).toHaveURL(PAGE_PATHS.REGISTRATION_PAGE);
        await expect(registrationPage.registrationForm).toBeVisible();
    });

    test('Homepage - Sign In page is opened after clicking correspondent button', { tag: ['@ui', '@smoke', '@homepage', '@p0'] }, async ({ publicHomePage, signInPage, page }) => {
        await publicHomePage.open();
        await publicHomePage.clickSignInButton();

        await expect(page).toHaveURL(/\/user\/login(\?.*)?$/);
        await expect(signInPage.signInForm).toBeVisible();
        await expect(signInPage.signInButton).toBeVisible();
    });
});