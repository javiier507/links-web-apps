"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

import { UpdateLinkTagsSchema } from "@repo/api/link";

import { CreateLink, DeleteLink, UpdateLinkTags } from "@/libs/api/resources";

const addLinkSchema = z.object({
    url: z.url("Invalid URL format"),
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
        revalidateTag("tags");

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

export async function deleteLinkAction(
    linkId: string,
): Promise<{ success: boolean; message: string }> {
    try {
        await DeleteLink(linkId);
        revalidatePath("/");
        revalidateTag("tags");
        return { success: true, message: "Link deleted successfully" };
    } catch (error) {
        console.error("Error deleting link:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete link",
        };
    }
}

export type UpdateLinkTagsState = {
    success: boolean;
    message: string;
    errors?: {
        tags?: string[];
    };
};

export async function updateLinkTagsAction(
    linkId: string,
    tags: string[],
): Promise<UpdateLinkTagsState> {
    const validation = UpdateLinkTagsSchema.safeParse({ tags });

    if (!validation.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: validation.error.flatten().fieldErrors,
        };
    }

    try {
        await UpdateLinkTags(linkId, validation.data.tags);
        revalidatePath("/");
        revalidateTag("tags");
        return { success: true, message: "Tags updated successfully" };
    } catch (error) {
        console.error("Error updating link tags:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to update tags",
        };
    }
}
