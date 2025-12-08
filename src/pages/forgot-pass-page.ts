import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { PAGE_PATHS } from "../constants/page-paths.js";

export class ForgotPassPage extends BasePage {
    readonly path: string = PAGE_PATHS.FORGOT_PASS_PAGE;
    readonly pageTitle: Locator;

    constructor(page: Page){
        super(page);
        this.pageTitle = page.locator('.header');
    }
}