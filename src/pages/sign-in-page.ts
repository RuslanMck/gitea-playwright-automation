import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { PAGE_PATHS } from "../constants/page-paths.js";

export class SignInPage extends BasePage {

    readonly path = PAGE_PATHS.SIGN_IN_PAGE;
    readonly signInForm: Locator;
    readonly usernameOrEmailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly validationFlashError: Locator;


    constructor(page: Page) {
        super(page);
        this.signInForm = page.locator('form[action="/user/login"]');
        this.usernameOrEmailInput = page.locator('#user_name');
        this.passwordInput = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.validationFlashError = page.locator('.flash-error p');
    }

    async open(): Promise<void> {
        await this.goto();
    }

    async fillUsernameOrEmail(usernameOrEmail: string): Promise<void> {
        await this.usernameOrEmailInput.fill(usernameOrEmail);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

    async clickForgotPass(): Promise<void> {
        await this.forgotPasswordLink.click();
    }

    async signIn(usernameOrEmail: string, password: string): Promise <void>{
        await this.fillUsernameOrEmail(usernameOrEmail);
        await this.fillPassword(password);
        await this.clickSignInButton();
    }
}