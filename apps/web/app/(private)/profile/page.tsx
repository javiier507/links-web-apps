import { redirect } from "next/navigation";

import { signOut } from "@/libs/auth/client-functions";
import { getAuthUser } from "@/libs/auth/server-functions";

import { SignOutButton } from "@/components/SignOutButton";

export default async function ProfilePage() {
    const user = await getAuthUser();

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
                    {/* Profile Image */}
                    {user.image && (
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <img
                                    src={user.image}
                                    alt={user.name || "Profile"}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-yellow-1/20"
                                />
                            </div>
                        </div>
                    )}

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
