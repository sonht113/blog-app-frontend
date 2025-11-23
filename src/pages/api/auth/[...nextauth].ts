import { NextApiRequest, NextApiResponse } from "next";
import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth, { NextAuthOptions, SessionOptions } from "next-auth";

import { serverConfig } from "@config";
import { signIn } from "@services/auth.service";

// Extend NextAuth types to include id in user
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
  }
}

/**
 * Helpers: quyết định secure cookie & domain
 * - FORCE_SECURE_COOKIES=true : ép secure = true (dùng để bật ở staging nếu staging dùng HTTPS)
 * - NEXTAUTH_URL must be set (e.g. https://staging.example.com or http://localhost:3000)
 * - COOKIE_DOMAIN optional: set explicit domain (e.g. .example.com) nếu muốn share cookie across subdomains
 */
function isSecureCookie(): boolean {
  if (process.env.FORCE_SECURE_COOKIES === "true") return true;
  if (process.env.NODE_ENV === "production") return true; // production => assume HTTPS
  // fallback: detect from NEXTAUTH_URL
  try {
    const url = new URL(process.env.NEXTAUTH_URL || "");
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function getCookieDomain(): string | undefined {
  // If explicit cookie domain provided, return it (allow leading dot for subdomains)
  if (process.env.COOKIE_DOMAIN) return process.env.COOKIE_DOMAIN;
  try {
    const url = new URL(process.env.NEXTAUTH_URL || "");
    const host = url.hostname;
    // Don't set domain for localhost (can't set cookie domain for localhost)
    if (host === "localhost" || host === "127.0.0.1") return undefined;
    // Return host by default (you may want to add leading dot: `.example.com` to cover subdomains)
    return host;
  } catch {
    return undefined;
  }
}

const SECURE = isSecureCookie();
const COOKIE_DOMAIN = getCookieDomain();

/**
 * Cookie name strategy:
 * - If secure and no domain specified -> we can use `__Host-` prefix (stronger guarantees)
 * - If domain is set (sharing cookie across subdomains) -> can't use __Host- (must omit or use __Secure-)
 */
function sessionCookieName() {
  if (SECURE && !COOKIE_DOMAIN) {
    // __Host- requires: Secure, Path=/, and no Domain attribute
    return "__Host-next-auth.session-token";
  }
  if (SECURE) {
    // __Secure- requires Secure flag, Domain may be present
    return "__Secure-next-auth.session-token";
  }
  return "next-auth.session-token";
}

const MAX_AGE = 1 * 24 * 60 * 60; // 1 day

const DEFAULT_SESSION_OPTIONS: Partial<SessionOptions> = {
  strategy: "jwt",
  maxAge: MAX_AGE,
};

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // your authorize implementation...
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;
        try {
          const response = await signIn({ email, password });
          console.log("🚀 ~ response:", response);
          const userData = response?.data?.user;
          if (!userData) return null;
          return {
            id: userData.id,
            email: userData.email,
            name: userData.fullName ?? userData.name,
            accessToken: response?.data?.accessToken,
            refreshToken: response?.data?.refreshToken,
          };
        } catch (e: any) {
          throw new Error(
            e?.response?.data?.message || e?.message || "Login failed"
          );
        }
      },
    }),
  ],

  secret: serverConfig.auth.secret,
  jwt: {
    secret: serverConfig.auth.secret,
    maxAge: MAX_AGE,
  },
  session: DEFAULT_SESSION_OPTIONS,

  // Cookie customization: set secure, sameSite, domain, httpOnly, path
  cookies: {
    sessionToken: {
      name: sessionCookieName(),
      options: {
        httpOnly: true,
        sameSite:
          (process.env.COOKIE_SAME_SITE as "lax" | "strict" | "none") || "lax",
        path: "/",
        secure: SECURE,
        // Domain only set when COOKIE_DOMAIN returns a value; otherwise NextAuth will not set Domain attribute
        domain: COOKIE_DOMAIN,
      },
    },
    // You can also override csrfToken and callbackUrl cookies similarly if needed
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.name = (user as any).name;
        if ((user as any).accessToken)
          token.accessToken = (user as any).accessToken;
        if ((user as any).refreshToken)
          token.refreshToken = (user as any).refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      try {
        const destination = new URL(url, baseUrl);
        const base = new URL(baseUrl);
        if (destination.origin !== base.origin) return baseUrl;
        return destination.toString();
      } catch {
        return baseUrl;
      }
    },
  },

  debug: process.env.NODE_ENV === "development",
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
