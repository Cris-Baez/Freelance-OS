'use client';

import { useEffect, useState } from 'react';

export type ProjectData = {
  name: string;
  description?: string;
  clientId: string;
  startDate: string;  // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  status: string;
};

type Props = {
  clients: { id: string; name: string }[];
  initial?: ProjectData;
  onCreate?: (data: ProjectData) => void;
  onUpdate?: (data: ProjectData) => void;
  onCancel?: () => void;
};

export const ProjectForm = ({
  clients,
  initial,
  onCreate,
  onUpdate,
  onCancel,
}: Props) => {
  const [data, setData] = useState<ProjectData>({
    name: initial?.name || '',
    description: initial?.description || '',
    clientId: initial?.clientId || clients[0]?.id || '',
    startDate: initial?.startDate || new Date().toISOString().substr(0, 10),
    endDate: initial?.endDate || '',
    status: initial?.status || 'Pendiente',
  });

  useEffect(() => {
    if (initial) setData(initial);
  }, [initial]);

  const handleChange = (field: keyof ProjectData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initial && onUpdate) onUpdate(data);
    else if (!initial && onCreate) onCreate(data);
    if (!initial) {
      // reset only on create
      setData({
        name: '',
        description: '',
        clientId: clients[0]?.id || '',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: '',
        status: 'Pendiente',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-4">
      <h2 className="text-xl font-bold">
        {initial ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      </h2>
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={data.name}
          onChange={handleChange('name')}
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          value={data.description}
          onChange={handleChange('description')}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Cliente</label>
        <select
          value={data.clientId}
          onChange={handleChange('clientId')}
          className="border rounded px-3 py-2 w-full"
        >
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-4">
        <div>
          <label className="block text-sm font-medium">Inicio</label>
          <input
            type="date"
            value={data.startDate}
            onChange={handleChange('startDate')}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fin</label>
          <input
            type="date"
            value={data.endDate}
            onChange={handleChange('endDate')}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select
          value={data.status}
          onChange={handleChange('status')}
          className="border rounded px-3 py-2 w-full"
        >
          <option>Pendiente</option>
          <option>En progreso</option>
          <option>Terminada</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {initial ? 'Actualizar' : 'Crear'}
        </button>
        {initial && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
