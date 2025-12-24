import { EmptyLinks } from "@/components/EmptyLinks";
import { LinksGrid } from "@/components/LinksGrid";
import { LinksHeader } from "@/components/LinksHeader";

import { getAuthCookie, getAuthUserFromAppwrite } from "@/libs/auth/server-functions";
import { getLinks } from "@repo/api/link.api";

export default async function Home() {
    const sessionSecret = await getAuthCookie();
    const links = await getLinks(sessionSecret ?? "");
    const user = await getAuthUserFromAppwrite();
    console.log("user", user);

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <LinksHeader linksCount={links.total} />

                {links.rows.length > 0 ? <LinksGrid links={links.rows} /> : <EmptyLinks />}
            </div>
        </div>
    );
}
