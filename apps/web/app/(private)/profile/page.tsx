import { redirect } from "next/navigation";

import { GetAuthUser } from "@/libs/api/auth";
import { signOut } from "@/libs/auth/client-functions";

import { SignOutButton } from "@/components/SignOutButton";

export default async function ProfilePage() {
    const user = await GetAuthUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white-1">Profile</h1>
                    <p className="text-gray-1 mt-2">Your personal information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-dark-2 rounded-xl border border-white/5 p-8">
                    {/* User Information */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <div className="block text-sm font-medium text-gray-1 mb-2">Name</div>
                            <div className="bg-dark-3 rounded-lg border border-white/5 px-4 py-3">
                                <p className="text-white-1">{user.name || "N/A"}</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <div className="block text-sm font-medium text-gray-1 mb-2">Email</div>
                            <div className="bg-dark-3 rounded-lg border border-white/5 px-4 py-3">
                                <p className="text-white-1">{user.email || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/5 my-8" />

                    {/* Actions */}
                    <div className="flex justify-end">
                        <SignOutButton signOut={signOut} />
                    </div>
                </div>
            </div>
        </div>
    );
}
