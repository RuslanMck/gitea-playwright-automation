# UI test cases

**Account actions: Signup**
- Navigate to the signup page
- Fill required fields: username, email, password
- Submit signup form
- Verify successful account creation by:
  - validate URL of redirect page
  - validate presence of logged-in UI elements (user name)
- Validate that login with newly created account is possible (optional: API check)

**Account actions: Login**
(login data is created on the test setup)
- Navigate to the login page
- Fill required fields: email, password
- Submit login form
- Verify successful user login by:
  - validate URL of redirect page
  - validate presence of logged-in UI elements (user name)

**Account actions: Logout**
(Storage state data is created on the test setup)
- Navigate to the dashboard page (using storage state)
- Click logout button
- Verify successful user logout by:
  - validate URL of redirect page
  - validate absence of logged-in UI elements (user name)

**Account actions: Account deletion**
(Storage state data is created on the test setup)
- Navigate to the dashboard page (using storage state)
- Navigate to the configurations main page
- Navigate to the user account configurations page
- Fill required fields: email
- Submit account deletion form
- Verify that user account is deleted by:
  - validate URL of redirect page
  - validate absence of logged-in UI elements (user name)
- Validate that login with deleted user credentials is not possible (optional: API check)

**Repo actions: Create**
(Storage state data is created on the test setup)
- Navigate to the dashboard page (using storage state)
- Click repo creation button
- Fill required fields: repo name
- Submit repo creation form
- Verify successful repo creation by:
  - validate URL of redirect page
  - validate presence of UI elements (repo name)
- Validate that the GET repo request returns expected data with repo name (optional: API check)

**Repo actions: Delete**
(Storage state data is created on the test setup)
- Navigate to the dashboard page (using storage state)
- Click repo creation button
- Fill required fields: repo name
- Submit repo deletion form
- Verify successful repo creation by:
  - validate URL of redirect page
  - validate absence of UI elements (repo name)
- Validate that the GET repo request returns expected error code (optional: API check)

**Issue actions: Create**
(Storage state data and repository are created on the test setup)
- Navigate to the repository page (using storage state)
- Click issue creation button
- Fill required fields: issue name
- Submit issue creation form
- Verify successful issue creation by:
  - validate URL of redirect page
  - validate presence of UI elements (issue name)
- Validate that the GET issue request returns expected data with issue name (optional: API check)

**Issue actions: Delete**
(Storage state data and repository are created on the test setup)
- Navigate to the repository page (using storage state)
- Navigate to the issue page
- Navigate to the issue configuration page
- Fill required fields: issue name
- Submit issue creation form
- Verify successful issue deletion by:
  - validate URL of redirect page
  - validate absence of UI elements (issue name)
- Validate that the GET issue request returns expected error code (optional: API check)

#### **P1 UI Flows**

**Logged in user navigation to restricted repo**
(Storage state data and repository are created on the test setup)
- Navigate to the repository page with restricted navigation (using storage state)
- Verify the failed user navigation:
  - validate URL of redirect page
  - validate presence of UI elements (error notification text)

**Create repo with already existed name**
(Storage state data is created on the test setup)
- Navigate to the dashboard page (using storage state)
- Click repo creation button
- Fill required fields: repo name (using name that already existed in the DB)
- Submit repo creation form
- Verify failed repo creation by:
  - validate URL of redirect page
  - validate presence of UI elements (error notification text)