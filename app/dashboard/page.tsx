"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <main className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-sm">
          <CardContent className="text-center">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </main>
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
    <main className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome back, {session.user.name}!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {session.user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">ID:</span> {session.user.id}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSignOut}
            className="w-full"
            variant="destructive"
          >
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
