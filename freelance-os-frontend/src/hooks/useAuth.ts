'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthContext = {
  loading: boolean;
  isAuthenticated: boolean;
  user: any;
  logout: () => void;
};

export function useAuth(): AuthContext {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // ← importante
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return {
    loading,
    isAuthenticated: Boolean(user),
    user,
    logout,
  };
}


