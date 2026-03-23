import type { LinkList } from "./link";

export const MOCKED_LINKS: LinkList = {
    total: 19,
    links: [
        {
            url: "https://hackertarget.com/tcpdump-examples/",
            title: "Tcpdump Examples - 22 Tactical Commands | HackerTarget.com",
            imageOriginalUrl: "https://picsum.photos/seed/6847a958000513f51267/200/200",
            imagePlaceholderUrl: null,
            tags: ["linux", "servers"],
            userId: "lorem",
            id: "6847a958000513f51267",
            createdAt: new Date("2025-06-10T03:41:11.927+00:00"),
            updatedAt: new Date("2025-06-10T04:09:10.976+00:00"),
        },
        {
            url: "https://react.dev/learn",
            title: "React Official Learning Path",
            imageOriginalUrl: "https://picsum.photos/seed/rec1/200/200",
            imagePlaceholderUrl: null,
            tags: ["react", "javascript"],
            userId: "lorem",
            id: "rec1",
            createdAt: new Date("2025-06-12T03:04:01.209+00:00"),
            updatedAt: new Date("2025-06-12T03:04:01.209+00:00"),
        },
        {
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            title: "JavaScript Guide – MDN",
            imageOriginalUrl: "https://picsum.photos/seed/rec3/200/200",
            imagePlaceholderUrl: null,
            tags: ["javascript", "apis"],
            userId: "lorem",
            id: "rec3",
            createdAt: new Date("2025-06-12T03:04:03.273+00:00"),
            updatedAt: new Date("2025-06-12T03:04:03.273+00:00"),
        },
    ],
};
