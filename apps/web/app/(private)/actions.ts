"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { CreateLink } from "@/libs/api/resources";

const addLinkSchema = z.object({
    url: z.string().url("Invalid URL format"),
});

export type AddLinkState = {
    success: boolean;
    message: string;
    errors?: {
        url?: string[];
    };
};

export async function addLinkAction(
    prevState: AddLinkState,
    formData: FormData,
): Promise<AddLinkState> {
    const url = formData.get("url") as string;

    // Validate with Zod
    const validation = addLinkSchema.safeParse({ url });

    if (!validation.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        // Create the link
        await CreateLink(validation.data.url);

        // Revalidate the page to show the new link
        revalidatePath("/");

        return {
            success: true,
            message: "Link added successfully",
        };
    } catch (error) {
        console.error("Error creating link:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to create link",
        };
    }
}
