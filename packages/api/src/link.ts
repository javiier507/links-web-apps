import type { Models } from "node-appwrite";

export interface Link extends Models.Document {
    url: string;
    title: string;
    imageOriginalUrl: string | null;
    imagePlaceholderUrl: string | null;
    tags: string[];
    userId: string;
}

export type LinkList = Models.DocumentList<Link>;
