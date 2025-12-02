import type { Models } from "appwrite";

export interface Link extends Models.Document {
    url: string;
    title: string;
    imageOriginalUrl: string | null;
    imagePlaceholderUrl: string | null;
    tags: string[];
    userId: string;
    /**
     * Inserted by Appwrite, but not available in official documentation
     */
    $sequence: string;
}

export type LinkList = Models.DocumentList<Link>;
