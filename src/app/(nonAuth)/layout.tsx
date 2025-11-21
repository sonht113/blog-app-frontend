import React from "react";


import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { ROUTE } from "@constants/route";







export default async function NonAuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Server-side check for existing session. If user is authenticated,
  // redirect them to the home page (so non-auth routes aren't accessible).
  const session = await getServerSession();
  if (session?.user) {
    // Redirect will send a 3xx response from the server
    redirect(ROUTE.HOME);
  }

  return <>{children}</>;
}
