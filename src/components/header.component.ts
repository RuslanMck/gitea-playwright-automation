import type { Locator, Page } from "@playwright/test";


export class HeaderComponent {
    private readonly page: Page;
    readonly helpButton: Locator;
    readonly exploreButton: Locator;
    readonly headerLogo: Locator;
    readonly registerButton: Locator;
    readonly signInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.helpButton = page.getByRole('link', {name: 'Help'});
        this.exploreButton = page.getByRole('link', {name: 'Explore'});
        this.headerLogo = page.locator('nav img[alt="Logo"]');
        this.registerButton = page.getByRole('link', {name: 'Register'});
        this.signInButton = page.getByRole('link', {name: 'Sign In'});
    }
}