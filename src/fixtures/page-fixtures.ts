import { PublicHomePage } from "../pages/public-home-page.js"
import { test as base } from "@playwright/test"
import { RegisterPage } from "../pages/register-page.js";
import { SignInPage } from "../pages/sign-in-page.js";

type UiFixtures = {
    publicHomePage: PublicHomePage;
    registrationPage: RegisterPage;
    signInPage: SignInPage;
}


export const test = base.extend<UiFixtures>({
    registrationPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    publicHomePage: async ({ page }, use) => {
        await use(new PublicHomePage(page));
    },

    signInPage: async ({page}, use) => {
        await use(new SignInPage(page));
    }
});

export { expect } from '@playwright/test';

