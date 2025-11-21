import { z } from "zod";
import { UserResponseSchema } from "./user-schemas.js";

export const RepoPermissionsSchema = z.object({
    admin: z.boolean(),
    push: z.boolean(),
    pull: z.boolean(),
}).loose();

export const SingleRepoResponseSchema = z.object({
    id: z.number().positive(),
    owner: UserResponseSchema,
    name: z.string(),
    permissions: RepoPermissionsSchema,
    full_name: z.string(),
}).loose();

export const MultipleReposResponseSchema = z.array(SingleRepoResponseSchema);

export const NotFoundRepoSchema = z.object({
    errors: z.string().nullable(),
    message: z.string(),
    url: z.url(),
});

export const NotFoundRepoOwnerSchema = z.object({
    errors: z.array(z.string()),
    message: z.string(),
    url: z.url(),
});

export type SingleRepoResponse = z.infer<typeof SingleRepoResponseSchema>;
export type MultipleReposResponse = z.infer<typeof MultipleReposResponseSchema>;



