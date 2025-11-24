import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.js";

export class SignInPage extends BasePage {

    readonly path = '/user/login';
    readonly signInForm: Locator;
    readonly usernameOrEmailInput: Locator;
    readonly password: Locator;
    readonly signInButton: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        super(page);
        this.signInForm = page.locator('form[action="/user/login"]');
        this.usernameOrEmailInput = page.locator('#user_name');
        this.password = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });

    }
}