"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="max-w-md mx-auto p-6 mt-10 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
  }

  return (
    <main className="max-w-md mx-auto p-6 mt-10">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session.user.name}!
        </h1>
        <div className="space-y-2 mb-6">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {session.user.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">ID:</span> {session.user.id}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </main>
  );
}