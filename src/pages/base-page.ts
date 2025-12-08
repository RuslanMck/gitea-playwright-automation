import { type Locator, type Page } from '@playwright/test'

export abstract class BasePage {
    protected readonly page: Page;
    abstract readonly path: string | RegExp;

    protected constructor(page: Page) {
        this.page = page;
    }

    async goto(query: string = ''): Promise<void> {
        await this.page.goto(`${this.path}${query}`);
        await this.waitForPageLoaded();
    }

    async waitForPageLoaded(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    protected getByTestId(testId: string): Locator {
        return this.page.getByTestId(testId);
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `artifacts/screenshots/${name}.png`, fullPage: true });
    }

}



