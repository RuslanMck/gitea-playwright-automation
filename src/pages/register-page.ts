import type { Locator, Page } from "@playwright/test";
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
        this.registerButton = page.getByRole('button', {name: 'Register Account'});
    }
}