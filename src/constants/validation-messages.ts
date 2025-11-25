
export const VALIDATION_MESSAGES = {
    REQUIRED_FIELD: 'Please fill out this field.',

    EMAIL: {
        MISSING_AT: (email: string) =>
            `Please include an '@' in the email address. '${email}' is missing an '@'.`,
        INCOMPLETE: (email: string) => `Please enter a part following \'@\'. '${email}' is incomplete.`,
    },
} as const;
