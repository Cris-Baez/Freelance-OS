// app/clients/page.tsx
'use client';

import { RequireAuth } from '../../components/ui/requireAuth';

export default function ClientsPage() {
  return (
    <RequireAuth>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Clientes</h1>
        <p>Acá se mostrará la lista de clientes</p>
      </div>
    </RequireAuth>
  );
}
