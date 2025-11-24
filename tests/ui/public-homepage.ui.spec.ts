import { uiFixtures, expect } from "../../src/fixtures/ui-fixtures.js";


uiFixtures.describe('Public Home Page test', () => {

    uiFixtures('Homepage - main page content is displayed after page opening', { tag: ['@ui', '@smoke', '@homepage', '@p0'] }, async ({ publicHomePage }) => {
        await publicHomePage.open();
        await expect(publicHomePage.logo).toBeVisible();
        await expect(publicHomePage.pageMainText).toBeVisible();
        await expect(publicHomePage.pageMainText).toContainText('Gitea');
    });

    uiFixtures('Homepage - Registration page is opened after clicking correspondent button', { tag: ['@ui', '@smoke', '@homepage', '@p0'] }, async ({ publicHomePage, registrationPage }) => {
        await publicHomePage.open();
        await publicHomePage.clickRegisterButton();
        await expect(registrationPage.registrationForm).toBeVisible();
    });

    uiFixtures('Homepage - Sign In page is opened after clicking correspondent button', { tag: ['@ui', '@smoke', '@homepage', '@p0'] }, async ({ publicHomePage, signInPage }) => {
        await publicHomePage.open();
        await publicHomePage.clickSignInButton();
        await expect(signInPage.signInForm).toBeVisible();
        await expect(signInPage.signInButton).toBeVisible();
    });
});