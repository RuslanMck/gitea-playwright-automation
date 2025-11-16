import { number, z } from "zod";

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

export const EmailSchema = z.object({
    email: z.email(),
    verified: z.boolean(),
    primary: z.boolean(),
    user_id: z.number(),
    username: z.any(),
});

export const EmailsResponseSchema = z.array(EmailSchema);

export type EmailResponse = z.infer<typeof EmailsResponseSchema>;

export const AccessTokenSchema = z.object({
    id: z.number().positive(),
    name: z.string(),
    sha1: z.string(),
    token_last_eight: z.string(),
    scopes: z.array(z.string()),
    created_at: z.string(),
    last_used_at: z.string()
});

export type AccessToken = z.infer<typeof AccessTokenSchema>;