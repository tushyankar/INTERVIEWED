import {
  Bell,
  Search,
  UserCircle2,
} from 'lucide-react';

function AppNavbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-md">
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search..."
          className="h-10 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative rounded-xl p-2 transition hover:bg-accent">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-3 rounded-xl transition hover:bg-accent p-2">
          <UserCircle2 size={32} />

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold">
              Tushyankar
            </p>

            <p className="text-xs text-muted-foreground">
              Software Engineer
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default AppNavbar;
