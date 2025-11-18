import type { APIResponse } from "@playwright/test";
import { z } from "zod";

export async function parseResponseUsingZod<T>(response: APIResponse, schema: z.ZodSchema<T>): Promise<T> {

    // if (!response.ok()) {
    //     const body = await response.text();
    //     throw new Error(`API request failed: ${response.status()}\n${body}`);
    // }
    const responseJson = await response.json();
    const parsedResponse = schema.parse(responseJson);
    return parsedResponse;
}