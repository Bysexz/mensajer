import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { MessageSquare, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useEffect } from 'react';

export default function Welcome() {
  const navigate = useNavigate();
  const { theme, toggleTheme, setTheme } = useThemeStore();

  useEffect(() => {
    // Asegurar que el tema inicial se aplique al cargar
    setTheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-950 dark:to-primary-950 relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-6 right-6">
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30"
        >
          <MessageSquare className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight"
        >
          Voxy
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-600 dark:text-slate-400 mb-10 text-lg"
        >
          Mensajería profesional diseñada para la productividad y el enfoque.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4"
        >
          <Button size="lg" className="w-full rounded-xl text-md" onClick={() => navigate('/login')}>
            Iniciar Sesión
          </Button>
          <Button variant="outline" size="lg" className="w-full rounded-xl text-md" onClick={() => navigate('/register')}>
            Crear una Cuenta
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
}
