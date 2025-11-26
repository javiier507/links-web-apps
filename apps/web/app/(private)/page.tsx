import { getAuthUser } from "@/libs/auth/server-functions";
import { signOut } from "@/libs/auth/actions";

export default async function Home() {
    const user = await getAuthUser();

    if (!user) {
        return <h1 style={{ textAlign: "center" }}>User not authenticated</h1>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Hello {user.name}</h1>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <form action={signOut}>
                    <button type="submit">Sign Out</button>
                </form>
            </div>
        </div>
    );
}
