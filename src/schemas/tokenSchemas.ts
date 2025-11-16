import { z } from "zod";

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