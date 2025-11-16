/**
 * Endpoints should be provided WITHOUT the leading slash
 */

export const USER_ENDPOINTS = {
    byUserName: (username: string) => `users/${username}`,
    allUserRepos: (username: string) => `users/${username}/repos`,
    postUserAccessToken: (username: string) => `users/${username}/tokens`,
    deleteUserAccessToken: (username: string, tokenName: string) => `users/${username}/tokens/${tokenName}`,
    search: 'users/search',
}

export const USER_SELF_ENDPOINTS = {
    repos: 'user/repos',
    user: 'user',
    emails: 'user/emails',
}

export const ADMIN_ENDPOINTS = {
    user: 'admin/users',
    deleteUser: (username: string) => `admin/users/${username}`,
}

export const REPO_ENDPOINTS = {
    getRepo: (username: string, repoName: string) => `repos/${username}/${repoName}`,
    deleteRepo: (username: string, repoName: string) => `repos/${username}/${repoName}`,
}