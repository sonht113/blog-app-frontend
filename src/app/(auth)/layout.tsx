import React from "react";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { ROUTE } from "@/constants/route";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Server-side check for session. If user is NOT authenticated,
  // redirect them to the login page.
  const session = await getServerSession();
  if (!session?.user) {
    // Redirect will send a 3xx response from the server
    redirect(ROUTE.LOGIN);
  }

  return <>{children}</>;
}
