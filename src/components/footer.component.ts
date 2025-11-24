import type { Locator, Page } from "@playwright/test";
import { th } from "zod/locales";

export class FooterComponent {
    private readonly page: Page;
    readonly selectedText: Locator;

    constructor(page: Page){
        this.page = page;
        this.selectedText = page.locator('footer').getByText('English');
    }
}