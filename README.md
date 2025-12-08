# Gitea Playwright Automation

**A modern, scalable test automation framework built using Playwright and TypeScript for testing API + UI flows of the Gitea web application.**
> [!NOTE]
> This project is designed as a portfolio-grade example to demonstrate framework architecture, API automation, UI automation, CI/CD integration, and reporting. 
> This project does not contain any Gitea source code. Gitea is an open-source Git service owned and maintained by the Gitea community. This repository contains only my custom Playwright automation framework used to test the Gitea web application.

---

- [Gitea Playwright Automation](#gitea-playwright-automation)
  - [Overview](#overview)
  - [Features](#features)
  - [Technical Stack](#technical-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running the Tests](#running-the-tests)
  - [Test Types](#test-types)
  - [Reporting](#reporting)
  - [GitHub Actions Integration](#github-actions-integration)
  - [Test Data Strategy](#test-data-strategy)
  - [Framework Architecture](#framework-architecture)
  - [Contributing](#contributing)
  - [License](#license)
  - [Disclaimer](#disclaimer)
  - [Contact](#contact)

---

## Overview

This repository contains a test automation framework that covers:
* API tests (REST endpoints)
* UI tests (Browser interactions)
* Combined UI and API workflows
* GitHub Actions for CI
* HTML test reporting publishing via GitHub Actions

 --- 

## Features
* Built with Playwright and TypeScript
* Page Object Model (POM) design pattern for UI tests
* Custom API client for API tests
* Zod schemas for API response validation
* Shared fixtures for API and UI tests
* BDD-style test naming conventions
* Environment variable configuration using `.env`
* Parallel test execution
* Detailed HTML reports with screenshots and logs

---

## Technical Stack

* Language: TypeScript
* Test Runner: Playwright Test
* API Testing: Playwright APIRequestContext
* Validation: Zod
* Reporting: Playwright HTML Reporter + GitHub Pages
* CI/CD: GitHub Actions

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git
- Docker (optional, for local Gitea instance)

### Installation
```
git clone https://github.com/RuslanMck/gitea-playwright-automation
cd gitea-playwright-automation
npm install
npx playwright install --with-deps
```

### Environment Variables
```
cp .env.example .env
```
### Running the Tests

**Run all tests:**
```
npx playwright test
```

**Run only UI tests:**
```
npx playwright test --grep @ui
```

**Run only API tests:**
```
npx playwright test --grep @api
```

**Open latest HTML report:**
```
npx playwright show-report
```

---

## Test Types

**API Tests**
Located in `tests/api/`
Use Playwright's APIRequestContext with custom API client to test Gitea REST endpoints.
Use Zod schemas to validate API responses.

**UI Tests**
Located in `tests/ui/`
Use Page Object Model (POM) design pattern to encapsulate page interactions.
Use custom fixtures for common UI workflows.

**API + UI Tests**
Use shared fixtures to combine API setup with UI verification.

## Reporting
Test results are published as HTML reports using Playwright's built-in HTML reporter.
For local runs, open the report using:
```
npx playwright show-report
```

For CI runs, reports are published to GitHub Pages. 
Accessible at: **_Will be added after first CI run_**

## GitHub Actions Integration

CI workflow is defined in `.github/workflows/ci.yml` and includes:
* Install Gitea image using Docker
* Install dependencies
* Install browsers
* Run tests
* Publish HTML report to GitHub Pages

## Test Data Strategy

Test data is created dynamically using API calls to ensure uniqueness and avoid conflicts.

* Temporary test users are generated using custom helper functions
* Test data uniqueness ensured by adding unique identifiers via custom functions
* Automated cleanup of test data after test execution

## Framework Architecture

This framework is build based on key design principles:
* Single Responsibility
* DRY (Don't Repeat Yourself)
* Type Safety (using TypeScript and Zod)
* Config-driven (using environment variables)
* Reusable fixtures and helpers

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes or improvement suggestions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

> [!IMPORTANT]
> This project is an independent test automation framework created for educational and portfolio purposes. 
> It does not include, modify, or distribute any part of the Gitea source code.
> * Gitea is an open-source project maintained by the Gitea Authors: https://gitea.io
> * All rights, trademarks, and ownership of Gitea belong to their respective maintainers.
>
> This repository contains only my own code, written to automate the Gitea application using Playwright and TypeScript.

## Contact
For questions or collaboration, reach out via:
* Email: mckruslan@gmail.com
* LinkedIn: https://www.linkedin.com/in/marchukruslan/
