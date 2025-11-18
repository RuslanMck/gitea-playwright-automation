import { z } from "zod";

export const UserResponseSchema = z.object({
    id: z.number().int().positive().min(1),
    login: z.string().min(1),
    login_name: z.string(),
    source_id: z.int(),
    full_name: z.string(),
    email: z.email(),
    avatar_url: z.url(),
    html_url: z.url(),
    language: z.string(),
    is_admin: z.boolean(),
    last_login: z.iso.datetime(),
    created: z.iso.datetime(),
    restricted: z.boolean(),
    active: z.boolean(),
    prohibit_login: z.boolean(),
    location: z.string(),
    website: z.string(),
    description: z.string(),
    visibility: z.enum(['public', 'private', 'limited']),
    followers_count: z.int(),
    following_count: z.int(),
    starred_repos_count: z.int(),
    username: z.string().min(1)
});

export type User = z.infer<typeof UserResponseSchema>;

export const GetUsersResponseSchema = z.object({
    data: z.array(UserResponseSchema),
});

export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;

export const UserErrorResponse = z.object({
    message: z.string(),
    url: z.string().url(),
})