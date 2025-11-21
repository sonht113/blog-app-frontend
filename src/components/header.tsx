"use client";

import React from "react";

import { useSession, signOut } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ROUTE } from "@constants/route";

import useActiveRoute from "@/hooks/useActiveRoute";

import InputSearch from "./input-search";
import Button from "./ui/button-custom";

export default function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.user;
  const router = useRouter();
  const [q] = React.useState("");

  const { activeClass } = useActiveRoute();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  function initials(name?: string | null) {
    if (!name) return "U";
    return name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-3/4 h-[70px] flex justify-center items-center border-b bg-white/60 backdrop-blur-sm rounded-b-lg">
      <div className="flex w-full items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link href={ROUTE.HOME} className="flex items-center gap-3">
            <div className="rounded-md bg-primary px-3 py-2 text-white font-semibold">
              MyBlog
            </div>
          </Link>

          <nav className="hidden gap-8 md:flex">
            <Link href={ROUTE.HOME} className={activeClass(ROUTE.HOME)}>
              Home
            </Link>
            <Link href={ROUTE.BLOGS} className={activeClass(ROUTE.BLOGS)}>
              Blogs
            </Link>
            <Link href={ROUTE.ABOUT} className={activeClass(ROUTE.ABOUT)}>
              About
            </Link>
            <Link href={ROUTE.CONTACT} className={activeClass(ROUTE.CONTACT)}>
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <form onSubmit={onSubmit} className="w-1/2 lg:w-1/3 max-w-lg">
            <InputSearch />
          </form>
        </div>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <Link href={ROUTE.LOGIN}>
              <Button variant="outline" colorScheme="primary" size="lg">
                Login
              </Button>
            </Link>
          ) : (
            <div className="relative">
              <button
                aria-label="Account"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-800"
                onClick={() => {
                  // toggle simple menu via browser confirm for simplicity
                  const action = window.confirm(
                    "Open account menu? OK = Sign out, Cancel = Profile"
                  );
                  if (action) {
                    signOut({ callbackUrl: ROUTE.HOME });
                  } else {
                    router.push(ROUTE.PROFILE);
                  }
                }}
              >
                {session?.user?.image ? (
                  <img
                    src={session.user.image as string}
                    alt="avatar"
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span>
                    {initials(
                      session?.user?.name ?? session?.user?.email ?? "User"
                    )}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
