'use client';

import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // ✅ Espera a que el componente esté montado en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router, mounted]);

  // ✅ Evita renderizar nada hasta que esté montado
  if (!mounted || loading || !isAuthenticated) {
    return <div className="p-4">Cargando...</div>;
  }

  return <>{children}</>;
};



