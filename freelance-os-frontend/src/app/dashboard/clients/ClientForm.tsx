'use client';

import { useEffect, useState } from 'react';

export type ClientData = {
  name: string;
  email: string;
};

type Props = {
  initialData?: ClientData;
  onCreate?: (data: ClientData) => void;
  onUpdate?: (data: ClientData) => void;
  onCancel?: () => void;
};

export const ClientForm = ({
  initialData,
  onCreate,
  onUpdate,
  onCancel,
}: Props) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');

  // Cuando cambian las `initialData`, sincronizamos el estado
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    if (initialData && onUpdate) {
      onUpdate({ name, email });
    } else if (!initialData && onCreate) {
      onCreate({ name, email });
      setName('');
      setEmail('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded space-y-4 mb-4"
    >
      <h2 className="text-xl font-bold">
        {initialData ? 'Editar cliente' : 'Agregar nuevo cliente'}
      </h2>
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {initialData ? 'Actualizar' : 'Guardar'}
        </button>
        {initialData && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

