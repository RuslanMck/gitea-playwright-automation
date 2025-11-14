# Test Scope – Gitea Playwright Automation

## 1. Purpose of This Document
The purpose of this document is to define the *exact* test coverage included in the Gitea Playwright Automation project.  
While the **Test Strategy** describes *how* testing is performed, this Test Scope document describes **what will be tested**, at which level (API / UI), and with what priority (P0 / P1 / P2).

---

## 2. In-Scope Areas

### 2.1 API Automation Scope

APIs are prioritized using the P0/P1/P2 model:

- **P0 - Critical:** Must be automated for the first version of the framework.  
- **P1 - Important:** Automated after P0; adds broader confidence.  
- **P2 - Out of scope:** Not required for the current iteration.

#### **P0 API Areas**
(Describe endpoints, but not test cases yet – those go to Section 3.)
- Users / Authentication:
  - `GET /users/{username}`
  - `POST /user/emails`
  - `DELETE /user/emails`
  - `POST /users/{username}/tokens`
  - `DELETE /users/{username}/tokens`
- Repositories:
  - `POST /user/repos`
  - `GET /repos/{owner}/{repo}`
  - `DELETE /repos/{owner}/{repo}`
  - `GET /users/{username}/repos`
- Admin APIs used for test setup:
  - `POST /admin/users`
  - `GET /admin/users`
  - `DELETE /admin/users`

#### **P1 API Areas**
(List endpoints planned for later phases.)
- Issues:
  - `POST /repos/{owner}/{repo}/issues`
  - `GET /repos/{owner}/{repo}/issues`
  - `DELETE /repos/{owner}/{repo}/issues/{index}`


#### **P2 API Areas (Excluded)**
  - Pull requests
  - Organization/Team management
  - Webhooks and integrations

---

### 2.2 UI Automation Scope

UI automation focuses on critical end-to-end flows only.

#### **P0 UI Flows**

- Signup
- Login
- Logout
- Account deletion
- Repository creation
- Repository deletion
- Issue creation
- Issue deletion

#### **P1 UI Flows**

- Access restricted repository
- Create repository with duplicate name

#### **P2 UI Flows**
- User account settings (non-critical)
- Repository configuration pages
- Advanced repository actions (wiki, releases, etc.)
- Two-factor authentication (2FA)

---

## 3. Test Scenarios

This section contains the *exact test scenarios* that will be implemented.

### 3.1 API Test Scenarios

#### **Users / Auth (P0)**
- `GET /users/{username}` - Verify retrieving existing user info  
- `POST /user/emails`, `DELETE /user/emails` - Validate email add/remove functionality
- `POST /users/{username}/tokens` - Validate user token creation
- `DELETE /users/{username}/tokens` - Validate user token deletion

#### **Repositories (P0)**
- `POST /user/repos` - Validate repository creation
- `GET /repos/{owner}/{repo}` - Verify retrieving existing repository of a user by repo name
- `DELETE /repos/{owner}/{repo}` - Verify deleting existing repository
- `GET /users/{username}/repos` - Verify retrieving all existing repositories of a user

#### **Admin APIs (P0 Infrastructure)**
  - `POST /admin/users` - Verify creating a user account by admin
  - `GET /admin/users` - Verify retrieving a user account by admin
  - `DELETE /admin/users` - Verify deleting a user account by admin

#### **Issues (P1)**
  - `POST /repos/{owner}/{repo}/issues` - Verify creating an issue in existing repo
  - `GET /repos/{owner}/{repo}/issues` - Verify retrieving all issues in exiting repo
  - `DELETE /repos/{owner}/{repo}/issues/{index}` - Verify deleting an issue in exiting repo

### 3.2 UI Test Scenarios

**Signup**
- Create a new user through the signup page.
- Verify successful account creation and visibility of logged-in UI state.

**Login**
- Log in using valid credentials created in test setup.
- Verify successful login and presence of authenticated UI state.

**Logout**
- Log out from an authenticated session.
- Verify that the user is returned to the unauthenticated state.

**Account deletion**
- Navigate to account settings and delete the current user account.
- Verify that the user can no longer log in.

**Repository creation**
- Create a new repository via UI.
- Verify repository page is displayed and the repo is accessible.

**Repository deletion**
- Delete an existing repository via UI.
- Verify the repository is removed (UI and optionally via API check).

**Issue creation**
- Create a new issue inside an existing repository.
- Verify the issue is displayed in the UI.

**Issue deletion**
- Delete an existing issue.
- Verify the issue no longer appears in the UI.

#### **P1 UI Flows**

**Access restricted repository**
- Attempt to open a private repository as a user without permissions.
- Expect access to be denied with proper error state.

**Create repository with duplicate name**
- Attempt to create a repository using an already existing name.
- Verify UI validation message and failure to create the repo.

#### **P2 UI Flows (Excluded)**
  - User account configurations
  - Repo configurations
  - Advanced repo actions
  - 2FA

---

## 4. Test Data Requirements

- Required admin account (provided via environment variables)
- Dynamic test users created via Admin APIs
- Repositories created per test or per suite
- Unique resource names (timestamp/UUID)
- Cleanup rules:
  - delete created repos  
  - delete temporary users  
  - cleanup leftover issues / branches  

---

## 5. Assumptions & Dependencies

- Gitea must run in Docker using the official image  
- Admin credentials available in `.env`  
- Playwright and dependencies installed  
- CI runner supports Docker or service containers  
- Tests request correct base URL from environment configuration  

---

## 6. Out of Scope

The following items are excluded from the current version of the framework:

- Pull requests  
- Organization/team flows  
- Webhooks and integrations  
- Advanced admin configuration  
- 2FA and authentication providers  
- Performance / load testing  
- Mobile UI testing  

---

## 7. Version History

| Date | Version | Description |
|------|---------|-------------|
| 2025-11-14 | 1.0 | Initial scope creation |