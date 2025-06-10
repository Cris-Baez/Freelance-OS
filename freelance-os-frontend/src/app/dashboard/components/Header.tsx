// app/dashboard/components/Header.tsx
'use client';
import { ThemeToggle } from "../../../components/ui/ThemeToggle";
import { useAuth } from '../../../hooks/useAuth';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
          <ThemeToggle />
          <span>Hola, {user?.name}</span>
      </div>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="bg-black text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};
