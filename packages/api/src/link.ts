import { z } from "zod";

export type Link = {
    id: string;
    url: string;
    title: string;
    imageOriginalUrl: string | null;
    imagePlaceholderUrl: string | null;
    tags: string[];
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type LinkList = {
    links: Link[];
    total: number;
};

export const LINKS_PER_PAGE = 40;

export type LinkQuery = {
    limit?: number;
    offset?: number;
    search?: string;
};

// Creating Link

export const UrlSchema = z.url({
    message: "Please enter a valid URL",
});

export const CreateLinkSchema = z.object({
    url: UrlSchema,
    title: z.string().min(1, "Title is required"),
    tags: z.array(z.string()).default([]),
    userId: z.string().min(1, "User ID is required"),
    imageOriginalUrl: z.string().nullish(),
    imagePlaceholderUrl: z.string().nullish(),
});

export type CreateLinkRequest = z.infer<typeof CreateLinkSchema>;

// Metadata

export const MetadataSchema = z.object({
    image: z
        .object({
            height: z.string().nullish(),
            type: z.string().nullish(),
            url: z.string().nullish(),
            width: z.string().nullish(),
        })
        .nullish(),
    title: z.string(),
});
export type Metadata = z.infer<typeof MetadataSchema>;
