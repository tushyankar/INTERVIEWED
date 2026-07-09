import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCircle2,
  Video,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

import { authService } from '@/services/auth/auth.service';
import { useAuthStore } from '@/store/auth.store';

const navigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Resume',
    href: '/resume',
    icon: FileText,
  },
  {
    title: 'Interview',
    href: '/interview',
    icon: Video,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

function AppSidebar() {
  const navigate = useNavigate();

  const logoutStore = useAuthStore(
    (state) => state.logout,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  async function handleLogout() {
    try {
      await authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      logoutStore();

      navigate('/login', {
        replace: true,
      });
    }
  }

  return (
    <aside className="hidden w-72 border-r bg-card lg:flex lg:flex-col">
      <div className="border-b px-6 py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          INTERVIEWED
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          AI Interview Platform
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`
              }
            >
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <UserCircle2 size={26} />
          </div>

          <div>
            <p className="text-sm font-semibold">
              {user?.fullName ?? 'User'}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.email ?? ''}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AppSidebar;