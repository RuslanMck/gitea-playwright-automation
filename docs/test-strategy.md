# Test Strategy – Gitea Playwright Automation

## 1. Project Overview

**Application Under Test (AUT):**  
Gitea – a self-hosted Git service providing source code hosting, repository management, and collaboration features. The environment is installed as Docker image 
provided by https://about.gitea.com/. For local test execution the environment runs on local Docker container on the tester’s machine. The same image is used for scheduled tests execution in CI.

**Purpose of this automation project:**  
The main purpose of current project is to demonstrate the skills of building automation framework using TypeScript and Playwright, covering framework architecture, API tests, UI tests, building CI/CD pipeline and test reporting, so that the resulting repository can be used as a portfolio project for recruiters.

---

## 2. Testing Principles

### 2.1 Test Pyramid

- Majority of automated tests at **API level**.
- Smaller number of **UI end-to-end tests** covering critical user flows.
- Unit tests are out of the project scope.

The test distribution is based on the automation framework architecture best practices, core principle of the test automation pyramid model, and with respect to shift-left test approach. 
Main focus is on the API tests as they are fast to execute, do not rely on the UI implementation and changes in DOM elements. In the context of shift-left test approach API test would be implemented at the first place. 
UI covers only the user flows that have highest priority in terms of user flow, as this project main focus is on demonstrating the QA competence, not achieving high test coverage.

### 2.2 Risk-Based Testing

- Prioritize features that are:
  - Core to Gitea’s functionality (repos, users, issues).
  - High-impact for typical users.
- P0 = highest priority: Must be automated. These cover core functionality such as users, repositories, and essential issue workflows.
- P1 = medium priority: Provide additional confidence but are not mandatory for the initial framework version.
- P2 = out of test scope: Advanced or administrative functionality that does not contribute to the primary demonstration goals of this project.

### 2.3 Reproducibility & Reliability

- Tests must be **repeatable**, **reliable**, and safe to run in **parallel**.
- Avoid hidden dependencies on existing data or previous executions.
- Use **API-based setup and cleanup** to ensure each test controls its own state.
- Prefer unique resource names (e.g. timestamped repo names) to avoid collisions.

In CI pipelines, tests run against a **clean Gitea environment** downloaded from the official Docker image. This ensures consistent starting conditions across executions and significantly reduces test flakiness.


---

## 3. Scope of Automation (High-Level)

### 3.1 API Scope (High-Level)

Planned API coverage (reference: https://demo.gitea.com/api/swagger#/)
Admin user management APIs are treated as P0 for this project because they are used by the test framework for creation and clean up test users (test infrastructure). The goal is not to fully cover all admin scenarios, but to ensure the basic admin flows required for fixtures remain stable.


- **Users / Auth (P0)**  
  - Get existing user info — `GET /users/{username}`
  - Add and delete email address — `POST /user/email`, `DELETE /user/email`
  - Create a user repository — `POST /user/repos`
  - List repositories owned by a user — `GET /users/{username}/repos`
  - Create an access user token — `POST /users/{username}/tokens`
  - Delete an access user token — `DELETE /users/{username}/tokens`
  - Create a user as admin `POST /admin/users`
  - Get a users list `GET /admin/users`
  - Delete a user as admin `DELETE /admin/users`

- **Repositories (P0)**  
  - Get repository info — `GET /repos/{owner}/{repo}`
  - Delete repository — `DELETE /repos/{owner}/{repo}`
  - Create branch — `POST /repos/{owner}/{repo}/branches`
  - Delete branch — `DELETE /repos/{owner}/{repo}/branches/{branch}`

- **Issues (P1)**  
  - Create an issue — `POST /repos/{owner}/{repo}/issues`
  - List repository issues — `GET /repos/{owner}/{repo}/issues`
  - Delete an issue — `DELETE /repos/{owner}/{repo}/issues/{index}`

- **Other areas (P2 / out-of-scope for now)**  
  - Create a pull request `POST /repos/{owner}/{repo}/pulls`
  - Get a list of repo pull request `GET /repos/{owner}/{repo}/pulls`
  - Organization/Team management
  - Webhooks and integrations


### 3.2 UI Scope (High-Level)

Planned UI flows (end-to-end):

- **P0 UI flows**  
  - Account actions: signup, login, logout, account deletion
  - Repo actions: create, delete
  - Issue actions: create, delete

- **P1 UI flows**  
  - Logged in user navigation to restricted repo
  - Create repo with already existed name

- **P2 UI flows (out-of-scope)**  
  - User account configurations
  - Repo configurations
  - Advanced repo actions
  - 2FA

---

## 4. Out of Scope

The following are explicitly **out of scope** for this iteration of the framework:

- Full admin configuration and advanced system settings.
- Organization / team management flows beyond simple scenarios.
- Webhooks, integrations, and OAuth flows.
- Performance / load testing (covered by other tools, not Playwright here).
- Mobile / responsive UI testing.

---

## 5. Technology Stack

This project uses:

- **Language:** TypeScript.
- **Test Runner:** Playwright Test (API + UI).
- **Schema Validation:** Zod for API response validation.
- **Config Management:** `.env` + small config helpers.
- **CI/CD:** GitHub Actions (and optionally Jenkins) to run tests on push and on schedule.
- **Reporting:** Playwright HTML reporter (and later Allure as an additional layer).

The following stack is selected based on th market requests and modern test automation trends. 

---

## 6. Non-Functional Goals

The framework should:

- Be **fast** enough to run a core suite on every commit.
- Support **parallel execution** of tests.
- Have a **clear architecture**:
  - separation between tests, pages, API services, schemas, and config.
- Be **easy to run locally** (minimal setup) and in CI.
- Be **readable** for reviewers (clean code, clear naming, light documentation).

---

## 7. Test Data Strategy (High-Level)

- Use **API calls** to create required test data (users, repos, issues) as a part of test setup.
- Prefer **unique names** (e.g. timestamp-based repo names) to avoid collisions.
- For critical flows:
  - create fresh data per test (or per test suite) to keep tests independent.
- Cleanup strategy:
  - delete created repos via API
  - run cleanup/nightly jobs for stale test data.

---

## 8. Environments & Execution

- Primary target: **local Gitea instance** (via Docker).
- CI environment: the same Gitea image/URL, configured via environment variables.
- Tests should not assume manual UI configuration before running.

---

## 9. CI/CD & Reporting (High-Level)

- Run a **core smoke suite** (API + key UI flows) on every push / PR.
- Run a broader **daily schedule** (cron) for regression.
- Publish Playwright HTML report as a CI artifact.
- Allure report later to demonstrate integration experience.

---
