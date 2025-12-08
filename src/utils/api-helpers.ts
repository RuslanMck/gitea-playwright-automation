import type { APIResponse } from "@playwright/test";
import { z } from "zod";

export async function parseResponseUsingZod<T>(response: APIResponse, schema: z.ZodSchema<T>): Promise<T> {

    const responseJson = await response.json();
    const parsedResponse = schema.parse(responseJson);
    return parsedResponse;
}