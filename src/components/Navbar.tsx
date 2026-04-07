"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-slate-900 transition-colors hover:text-indigo-600"
        >
          Water Forest
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-slate-600 md:flex">
          <Link href="/community" className="transition-colors hover:text-slate-900">
            Community
          </Link>
          <Link href="/community/write" className="transition-colors hover:text-slate-900">
            Write
          </Link>
          <a href="#about" className="transition-colors hover:text-slate-900">
            About
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            로그인
          </button>
          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500"
          >
            회원가입
          </button>
        </div>
      </div>
    </header>
  );
}
