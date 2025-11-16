import { z } from "zod";

export const EmailSchema = z.object({
    email: z.email(),
    verified: z.boolean(),
    primary: z.boolean(),
    user_id: z.number(),
    username: z.any(),
});

export const EmailsResponseSchema = z.array(EmailSchema);

export type EmailResponse = z.infer<typeof EmailsResponseSchema>;