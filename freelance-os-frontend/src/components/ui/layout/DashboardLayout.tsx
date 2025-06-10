'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-2xl font-bold mb-6">Freelance OS</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:bg-gray-200 p-2 rounded">
            Inicio
          </Link>
          <Link href="/dashboard/projects" className="hover:bg-gray-200 p-2 rounded">
            Proyectos
          </Link>
          <Link href="/dashboard/clients" className="hover:bg-gray-200 p-2 rounded">
            Clientes
          </Link>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <span className="font-medium">Hola, {user?.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </header>

        {/* Content */}
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
