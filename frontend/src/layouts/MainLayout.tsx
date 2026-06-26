import { Outlet, useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { MessageSquare, Settings, LogOut, Search } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { useThemeStore } from '../store/themeStore';
import { useEffect } from 'react';

export default function MainLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const { setTheme, theme } = useThemeStore();

  useEffect(() => {
    setTheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-20 lg:w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-900 transition-all duration-300">
        <div className="p-4 h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 font-bold text-xl hidden lg:block tracking-tight text-slate-900 dark:text-white">Voxy</span>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* Menu Items */}
          <div className="group flex items-center p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 cursor-pointer transition-colors">
            <MessageSquare className="w-6 h-6 shrink-0" />
            <span className="ml-3 font-medium hidden lg:block">Mensajes</span>
          </div>
          {/* Add more nav items as needed */}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
          <Button variant="ghost" className="justify-center lg:justify-start px-3 h-12 w-full">
            <Settings className="w-6 h-6 lg:mr-3 shrink-0" />
            <span className="hidden lg:block font-medium">Configuración</span>
          </Button>
          <Button variant="ghost" className="justify-center lg:justify-start px-3 h-12 w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10" onClick={handleLogout}>
            <LogOut className="w-6 h-6 lg:mr-3 shrink-0" />
            <span className="hidden lg:block font-medium">Salir</span>
          </Button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-6 shrink-0">
          <div className="flex-1 max-w-xl flex items-center bg-slate-100 dark:bg-slate-800/50 rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700/50">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar conversaciones..." 
              className="bg-transparent border-none focus:outline-none focus:ring-0 ml-3 w-full text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center ml-4 gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">@{user?.username || 'usuario'}</p>
            </div>
            <Avatar size="md" initials={user?.name?.[0]?.toUpperCase() || 'U'} />
          </div>
        </header>

        {/* Chat Area / Outlet */}
        <div className="flex-1 overflow-hidden flex bg-slate-50/50 dark:bg-slate-950/50 relative">
          <Outlet />
          {/* Placeholder temporal hasta que haya rutas hijas */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 -z-10 pointer-events-none">
            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">Selecciona una conversación</p>
            <p className="text-sm">o inicia una nueva para comenzar a chatear</p>
          </div>
        </div>
      </main>
    </div>
  );
}
