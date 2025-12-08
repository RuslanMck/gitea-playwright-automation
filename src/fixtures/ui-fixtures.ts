import { PublicHomePage } from "../pages/public-home-page.js"
import { test as base } from "@playwright/test"
import { RegisterPage } from "../pages/register-page.js";
import { SignInPage } from "../pages/sign-in-page.js";
import { DashboardPage } from "../pages/dashboard-page.js";
import { ForgotPassPage } from "../pages/forgot-pass-page.js";

type UiFixtures = {
    publicHomePage: PublicHomePage;
    registrationPage: RegisterPage;
    signInPage: SignInPage;
    dashboardPage: DashboardPage;
    forgotPassPage: ForgotPassPage;
}


export const uiFixtures = base.extend<UiFixtures>({
    registrationPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },

    publicHomePage: async ({ page }, use) => {
        await use(new PublicHomePage(page));
    },

    signInPage: async ({page}, use) => {
        await use(new SignInPage(page));
    },

    dashboardPage: async ({page}, use) => {
        await use(new DashboardPage(page));
    },

    forgotPassPage: async ({page}, use) => {
        await use(new ForgotPassPage(page));
    }
});

export { expect } from '@playwright/test';

