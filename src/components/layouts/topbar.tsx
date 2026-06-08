"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Command, LogOut, Search, Settings, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layouts/theme-toggle";
import { authApi } from "@/modules/auth/api/auth.api";
import { clearAuthSession } from "@/modules/auth/lib/auth-session";
import { useAuthStore } from "@/modules/auth/stores/auth.store";

export function Topbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logoutStore = useAuthStore((state) => state.logout);

  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // Token may already be expired; client-side cleanup still needs to run.
    }

    clearAuthSession();
    logoutStore();
    router.replace("/login");
  }

  const initials = (user?.fullName ?? "System Admin")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/80 px-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 sm:px-6 lg:px-8 xl:px-10">
      <div className="relative w-full max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          className="h-11 rounded-2xl border-slate-200 bg-slate-50/80 pl-11 pr-20 text-sm shadow-inner shadow-slate-200/30 transition focus:bg-white dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none dark:focus:bg-slate-900"
          placeholder="Search owners, stores, contracts..."
        />
        <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold text-slate-400 dark:border-slate-800 dark:bg-slate-950 sm:flex">
          <Command className="h-3 w-3" /> K
        </div>
      </div>
      <div className="ml-4 flex items-center gap-2 sm:ml-6 sm:gap-3">
        <button className="hidden h-11 items-center gap-2 rounded-2xl border border-primary/15 bg-primary/10 px-4 text-sm font-bold text-primary transition hover:bg-primary hover:text-white xl:flex">
          <Sparkles className="h-4 w-4" />
          Admin AI
        </button>
        <ThemeToggle />
        <button aria-label="Notifications" className="relative grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <Bell className="h-4 w-4" />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        </button>
        <Link aria-label="Settings" href="/settings" className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <Settings className="h-4 w-4" />
        </Link>
        <button aria-label="Logout" onClick={logout} className="grid h-11 w-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <LogOut className="h-4 w-4" />
        </button>
        <div className="hidden text-right md:block">
          <p className="text-sm font-bold text-slate-950 dark:text-white">{user?.fullName ?? "System Admin"}</p>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{user?.role ?? "Administrator"}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-slate-700 text-sm font-bold text-white shadow-sm dark:from-white dark:to-slate-300 dark:text-slate-950">
          {initials}
        </div>
      </div>
    </header>
  );
}
