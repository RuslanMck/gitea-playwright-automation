import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base-page.js";

export class RegisterPage extends BasePage {
    readonly path = '/user/sign_up';
    readonly registrationForm: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly passwordConfirmInput: Locator;
    readonly registerButton: Locator;


    constructor(page: Page) {
        super(page);
        this.registrationForm = page.locator('form[action="/user/sign_up"]');
        this.usernameInput = page.locator('#user_name');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.passwordConfirmInput = page.locator('#retype');
        this.registerButton = page.getByRole('button', { name: 'Register Account' });
    }

    async open(): Promise<void> {
        await this.page.goto('/user/sign_up')
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async fillConfirmPassword(confirmPassword: string): Promise<void> {
        await this.passwordConfirmInput.fill(confirmPassword);
    }

    async clickRegistrationButton(): Promise<void> {
        await this.registerButton.click();
    }

}