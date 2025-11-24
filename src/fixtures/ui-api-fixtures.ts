import { mergeTests } from '@playwright/test';
import { apiFixtures } from './api-fixtures.js';
import { uiFixtures } from './ui-fixtures.js';

// Merge both test objects into one
export const test = mergeTests(apiFixtures, uiFixtures);

export { expect } from '@playwright/test';