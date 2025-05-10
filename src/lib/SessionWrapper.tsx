"use client";

import { SessionProvider } from "next-auth/react";

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider baseUrl="/api/auth">{children}</SessionProvider>;
};

export default SessionWrapper;
