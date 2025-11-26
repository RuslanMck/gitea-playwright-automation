import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page.js";
import { PAGE_PATHS } from "../constants/page-paths.js";

export class DashboardPage extends BasePage {
    readonly path = PAGE_PATHS.DASHBOARD_PAGE;
    readonly dashboardOwnerName: Locator;
    readonly dashboardRepoList: Locator;

    constructor(page: Page){
        super(page);
        this.dashboardOwnerName = page.locator('.dropdown .text .gt-ellipsis');
        this.dashboardRepoList = page.locator('#dashboard-repo-list');
    }
}