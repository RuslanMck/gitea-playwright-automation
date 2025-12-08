
export const VALIDATION_MESSAGES = {
    REQUIRED_FIELD: 'Please fill out this field.',

    EMAIL: {
        MISSING_AT: (email: string) =>
            `Please include an '@' in the email address. '${email}' is missing an '@'.`,
        INCOMPLETE: (email: string) => `Please enter a part following \'@\'. '${email}' is incomplete.`,
    },

    USERNAME_TAKEN: 'The username is already taken.',
    EMAIL_USED: 'The email address is already used.',
    PASSWORD_MISMATCH: 'The passwords do not match.',
    INCORRECT_CREDENTIALS: 'Username or password is incorrect.',

} as const;
