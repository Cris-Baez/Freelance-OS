import Link from 'next/link';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-2xl font-bold mb-6">Freelance OS</h2>
      <nav className="space-y-2">
        <Link href="/dashboard" className="block hover:bg-gray-700 p-2 rounded">Inicio</Link>
        <Link href="/dashboard/projects" className="block hover:bg-gray-700 p-2 rounded">Proyectos</Link>
        <Link href="/dashboard/clients" className="block hover:bg-gray-700 p-2 rounded">Clientes</Link>
        <Link href="/dashboard/tasks" className="block hover:bg-gray-700 p-2 rounded">Tareas</Link>
        <Link href="/dashboard/invoices" className="block hover:bg-gray-700 p-2 rounded">Recibo</Link>
      </nav>
    </aside>
  );
};

