"use client";

import { usePathname } from "next/navigation";
import { useMe } from "@/lib/queries/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading } = useMe();

  if (isLoading && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/40 text-sm">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}