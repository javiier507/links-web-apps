import type { Models } from "node-appwrite";

export interface Link extends Models.Row {
    url: string;
    title: string;
    imageOriginalUrl: string | null;
    imagePlaceholderUrl: string | null;
    tags: string[];
    userId: string;
}

export type LinkList = Models.RowList<Link>;
