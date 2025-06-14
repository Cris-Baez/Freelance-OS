'use client';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <nav className="w-full p-4 flex justify-between items-center bg-gray-100 shadow">
      <h1 className="text-xl font-bold">Freelance OS</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </nav>
  );
};
