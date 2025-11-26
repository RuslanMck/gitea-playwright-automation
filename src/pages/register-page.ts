import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { PAGE_PATHS } from "../constants/page-paths.js";

export class RegisterPage extends BasePage {
    readonly path = PAGE_PATHS.REGISTRATION_PAGE;
    readonly registrationForm: Locator;
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly passwordConfirmInput: Locator;
    readonly registerButton: Locator;
    readonly validationFlashError: Locator;


    constructor(page: Page) {
        super(page);
        this.registrationForm = page.locator('form[action="/user/sign_up"]');
        this.usernameInput = page.locator('#user_name');
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.passwordConfirmInput = page.locator('#retype');
        this.registerButton = page.getByRole('button', { name: 'Register Account' });
        this.validationFlashError = page.locator('.flash-error p');
    }

    async open(): Promise<void> {
        await this.goto();
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

    async register(username: string, email: string, password: string, confirmPassword: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillConfirmPassword(confirmPassword);
        await this.clickRegistrationButton();
    }

}