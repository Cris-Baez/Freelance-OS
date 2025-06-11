'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

// 1) Definimos el esquema Zod
const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // 2) Función que envía al backend
  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Error en el registro');
      }

      toast.success('Registro exitoso, redirigiendo al login…');
      setTimeout(() => router.push('/login'), 1000);
    } catch (err: any) {
      console.error(err);
      toast.error(`Error al registrar: ${err.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <Label>Nombre</Label>
          <Input
            type="text"
            placeholder="Tu nombre"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="tu@correo.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <Label>Contraseña</Label>
          <Input
            type="password"
            placeholder="••••••••"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Botón registrar */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando…' : 'Registrarse'}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Inicia sesión
        </a>
      </p>
    </div>
  );
}
