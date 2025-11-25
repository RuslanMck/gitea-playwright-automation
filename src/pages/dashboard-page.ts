import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.js";

export class DashboardPage extends BasePage {
    readonly path = '/';
    readonly dashboardOwnerName: Locator;
    readonly dashboardRepoList: Locator;

    constructor(page: Page){
        super(page);
        this.dashboardOwnerName = page.locator('.dropdown .text .gt-ellipsis');
        this.dashboardRepoList = page.locator('#dashboard-repo-list');
    }
}