import { z } from "zod";

export const RepoOwnerSchema = z.object({
    id: z.number().positive(),
    login: z.string().min(1),
    email: z.email(),
    visibility: z.string(),
    username: z.string(),
}).loose();

export const RepoPermissionsSchema = z.object({
    admin: z.boolean(),
    push: z.boolean(),
    pull: z.boolean(),
}).loose();

export const SingleRepoResponseSchema = z.object({
    id: z.number().positive(),
    owner: RepoOwnerSchema,
    name: z.string(),
    permissions: RepoPermissionsSchema,
}).loose();

export const MultipleReposResponseSchema = z.array(SingleRepoResponseSchema);

export type CreateRepoResponse = z.infer<typeof SingleRepoResponseSchema>;
export type GetAllUserReposResponse = z.infer<typeof MultipleReposResponseSchema>;

