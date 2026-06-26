import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useEffect } from 'react';

const registerSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { setTheme, theme } = useThemeStore();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    setTheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: RegisterForm) => {
    // TODO: Connect to backend
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate('/app');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative transition-colors duration-500 py-12">
      
      <Button 
        variant="ghost" 
        className="absolute top-6 left-6 text-slate-500 dark:text-slate-400"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Crea tu cuenta</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Únete a Voxy hoy mismo</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nombre"
                placeholder="Juan"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Apellido"
                placeholder="Pérez"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              label="Nombre de Usuario"
              placeholder="juanperez"
              {...register('username')}
              error={errors.username?.message}
            />

            <Input
              label="Correo Electrónico"
              type="email"
              placeholder="tu@email.com"
              {...register('email')}
              error={errors.email?.message}
            />
            
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />

            <Button type="submit" className="w-full rounded-xl h-11 mt-2" isLoading={isSubmitting}>
              Registrarse
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-8">
            ¿Ya tienes una cuenta?{' '}
            <button type="button" onClick={() => navigate('/login')} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
              Inicia Sesión
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
