/**
 * Endpoints should be provided WITHOUT the leading slash
 */

export const USER_ENDPOINTS = {
    byUserName: (username: string) => `users/${username}`,
    search: 'users/search',
    create: 'admin/users',
    repos: 'user/repos',
    allUserRepos: (username: string) => `users/${username}/repos`,
}