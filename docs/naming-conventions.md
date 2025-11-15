# Naming Conventions Guidelines

This document defines the official naming rules for the Playwright + TypeScript automation framework.
Each naming rule includes the name of the standard (ISO / ECMA / Conventional Commit Spec) it follows.

## 1. Branch Naming Conventions

**Standard: Git SCM Best Practices, GitHub Flow, Semantic Branching Guidelines**

**1.1 Pattern**

`<category>/<scope>-<short-description>`

**1.2 Recommended Categories**

- feature/ – new functionality
- tests/ – automated tests (API/UI)
- fix/ – bug fixes
- docs/ – documentation
- chore/ – cleanup / refactor
- ci/ – CI/CD changes

**1.3 Examples**
```
tests/api-user-basic
tests/ui-login-flow
feature/repository-permissions
fix/api-token-expiry
docs/test-strategy
```

---

## 2. Folder Naming Conventions

**Standard: lowercase-with-hyphens (GNU FHS + POSIX)**

**2.1 Pattern**

`lowercase-with-dashes`

**2.2 Examples**
```
tests/api
tests/ui
src/services
src/schemas
src/utils
src/pages
```

---

## 3. File Naming Conventions

**Standard: kebab-case (Node.js, ESLint, Airbnb JS Style Guide)**

**3.1 Pattern**

`kebab-case.ts`

**3.2 Examples**
```
user-service.ts
create-user.spec.ts
user-schema.ts
auth.fixture.ts
dashboard-page.ts
```

**3.3 Test File Pattern**

`<feature>.<layer>.spec.ts`

**3.4 Examples:**
```
user-login.api.spec.ts
repository-create.api.spec.ts
dashboard-ui.spec.ts
```

---

## 4. Class Naming

**Standard: PascalCase (ECMA-262 JavaScript Language Specification)**

**4.1 Pattern**

`PascalCase`

**4.2 Examples**
```
class UserService {}
class AuthService {}
class DashboardPage {}
class ApiClient {}
class RepositorySchema {}
```

---

## 5. Function Naming

**Standard: camelCase (ECMAScript + ISO/IEC 14882 style principles)**

**5.1 Pattern**

`camelCase()`

**5.2 Examples**
```
createUser()
validateSchema()
loginAsAdmin()
generateToken()
getUserByEmail()
```

---

## 6. Variable Naming

**Standard: camelCase (ECMAScript + Airbnb JavaScript Style Guide)**

**6.1 Examples**
```
const apiToken = ...
const isLoggedIn = ...
let userId = ...
```

**6.2 Boolean Names Should Start With**

`is / has / can / should`


**6.3 Examples:**
```
isVisible
hasErrors
canRetry
shouldAutoLogin
```

---

## 7. Fixture Naming (Playwright)

**Standard: camelCase (Playwright Official Style)**

**7.1 Examples**
```
apiService
userHelper
dashboardPage
authClient
```

**7.2 Fixture Definition Example**
```
const test = base.extend<MyFixtures>({
  apiService: async ({ request }, use) => { ... },
});
```

---

## 8. Test Naming (Titles)

**Standard: BDD-style (Gherkin + Jest conventions)**

**8.1 Pattern**

`should <expected behavior> when <context>`

**8.2 Examples**
```
test('should return 401 when token is missing', ...)
test('should create user when data is valid', ...)
test('should show dashboard after successful login', ...)
```

---

## 9. API Schema Naming (Zod)

**Standard: PascalCase (TypeScript interface naming)**

**9.1 Examples**
```
UserCreateSchema
TokenValidationSchema
RepositoryResponseSchema
```

---

## 10. DTO Naming

**Standard: PascalCase (UML ISO/IEC 19505 + OOP naming)**

**10.1 Examples**
```
UserCreateDto
RepositoryDto
AuthTokenDto
```

---

## 11. Page Object Naming

**Standard: PascalCase (Industry POM conventions)**

**11.1 Examples**
```
LoginPage
DashboardPage
ProfilePage
RepositoryPage
```

---

## 12. Constants & Enums

**Standard: UPPER_SNAKE_CASE (ISO C99 + UNIX conventions)**

**12.1 Constants**
```
API_BASE_URL
DEFAULT_PASSWORD
MAX_RETRY_COUNT
```

**12.2 Enums**
```
enum UserRole {
  Admin,
  User,
  Guest,
}
```

---

## 13. Import Paths & File References

**Standard: kebab-case files + camelCase variables**

**13.1 Examples**
```
import { UserService } from '../services/user-service';
import { CreateUserSchema } from '../schemas/user-schema';
```

## 14. Commit Message Conventions

**Standard: Conventional Commits v1.0.0**

**14.1 Pattern**

`<type>(scope): message`

**14.2 Allowed Types**

- feat – new feature
- fix – bug fix
- tests – automated tests
- docs – documentation
- chore – maintenance
- ci – pipeline changes

**14.3 Examples**
```
tests(api): add create user API tests
docs: add naming conventions guide
feat(repo): implement repository creation API
fix(auth): adjust token expiry logic
```

## 15. Recommended Folder Structure

```
project/
│
├─ src/
│   ├─ services/
│   ├─ schemas/
│   ├─ fixtures/
│   ├─ pages/
│   └─ utils/
│
├─ tests/
│   ├─ api/
│   │   ├─ users/
│   │   ├─ repositories/
│   │   └─ auth/
│   └─ ui/
│       ├─ login/
│       ├─ dashboard/
│       └─ repositories/
│
└─ docs/
    ├─ naming-conventions.md
    ├─ test-strategy.md
    └─ architecture.md

```