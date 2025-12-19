import type { Models } from "node-appwrite";

import type { Link } from "./link";

/**
 * Map Appwrite document to Link type
 * @param link - Appwrite document
 * @returns Link type
 */
export function toLink(link: Models.Row): Link {
    return link as Link;
}
