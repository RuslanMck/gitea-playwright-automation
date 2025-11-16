import { z } from "zod";
import { UserResponseSchema } from "./userSchemas.js";

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

export type SingleRepoResponse = z.infer<typeof SingleRepoResponseSchema>;
export type MultipleReposResponse = z.infer<typeof MultipleReposResponseSchema>;



