'use client';

import { useEffect, useState } from 'react';

export type TaskData = {
  title: string;
  description?: string;
  status: 'Pendiente' | 'En progreso' | 'Terminada';
  projectId: string;
};

type Props = {
  projects: { id: string; name: string }[];
  initial?: TaskData;
  onCreate?: (data: TaskData) => void;
  onUpdate?: (data: TaskData) => void;
  onCancel?: () => void;
};

export const TaskForm = ({
  projects,
  initial,
  onCreate,
  onUpdate,
  onCancel,
}: Props) => {
  const [data, setData] = useState<TaskData>({
    title: initial?.title || '',
    description: initial?.description || '',
    status: initial?.status || 'Pendiente',
    projectId: initial?.projectId || projects[0]?.id || '',
  });

  useEffect(() => {
    if (initial) setData(initial);
  }, [initial]);

  const handle = (field: keyof TaskData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initial && onUpdate) onUpdate(data);
    else if (!initial && onCreate) onCreate(data);
    if (!initial) {
      // reset on create
      setData({ title: '', description: '', status: 'Pendiente', projectId: projects[0]?.id || '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-4">
      <h2 className="text-xl font-bold">{initial ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          value={data.title}
          onChange={handle('title')}
          required
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          value={data.description}
          onChange={handle('description')}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Proyecto</label>
        <select
          value={data.projectId}
          onChange={handle('projectId')}
          className="border rounded px-3 py-2 w-full"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select
          value={data.status}
          onChange={handle('status')}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Terminada">Terminada</option>
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
