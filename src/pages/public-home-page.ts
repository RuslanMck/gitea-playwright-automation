import type { Locator, Page } from "@playwright/test";
import { HeaderComponent } from "../components/header.component.js";
import { BasePage } from "./base-page.js";

export class PublicHomePage extends BasePage {
    readonly path = '/';
    readonly header: HeaderComponent;
    readonly logo: Locator;
    readonly pageMainText: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new HeaderComponent(page);
        this.logo = page.locator('img.logo[alt="Logo"]');
        this.pageMainText = page.locator('h1.title');
    }

    async open(): Promise<void> {
        await this.goto();
    }

    async clickRegisterButton(): Promise<void> {
        await this.header.registerButton.click();
    }

    async clickSignInButton(): Promise<void> {
        await this.header.signInButton.click();
    }

    async getMainTitleText(): Promise<string | null> {
        return await this.pageMainText.textContent();
    }

}   