'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchWithToken } from '../../../lib/api';
import { ProjectForm, ProjectData } from './ProjectForm';

type Project = ProjectData & { id: string; client: { name: string } };
type Client = { id: string; name: string };

export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);

  // 1) Carga inicial: proyectos + clientes (para el select)
  const loadAll = async () => {
    setLoading(true);
    try {
      const [projData, clientData] = await Promise.all([
        fetchWithToken('/projects', { method: 'GET' }),
        fetchWithToken('/clients',  { method: 'GET' }),
      ]);
      setProjects(projData as Project[]);
      setClients((clientData as any[]).map((c) => ({ id: c.id, name: c.name })));
      toast.success('Datos cargados correctamente');
    } catch (err: any) {
      toast.error(`Error al cargar datos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // 2) Crear proyecto
  const create = async (data: ProjectData) => {
    try {
      await fetchWithToken('/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast.success('Proyecto creado correctamente');
      loadAll();
    } catch (err: any) {
      toast.error(`Error al crear proyecto: ${err.message}`);
    }
  };

  // 3) Actualizar proyecto
  const update = async (data: ProjectData) => {
    if (!editing) return;
    try {
      await fetchWithToken(`/projects/${editing.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      toast.success('Proyecto actualizado correctamente');
      setEditing(null);
      loadAll();
    } catch (err: any) {
      toast.error(`Error al actualizar proyecto: ${err.message}`);
    }
  };

  // 4) Eliminar proyecto
  const remove = async (id: string) => {
    try {
      await fetchWithToken(`/projects/${id}`, { method: 'DELETE' });
      toast.success('Proyecto eliminado correctamente');
      loadAll();
    } catch (err: any) {
      toast.error(`Error al eliminar proyecto: ${err.message}`);
    }
  };

  if (loading) {
    return <p className="p-4 text-center">Cargando proyectos…</p>;
  }

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded shadow">
      <ProjectForm
        clients={clients}
        initial={editing || undefined}
        onCreate={create}
        onUpdate={update}
        onCancel={() => setEditing(null)}
      />

      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-bold text-lg">{p.name}</p>
              <p className="text-sm text-gray-600">Cliente: {p.client.name}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(p)}
                className="text-blue-500 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => remove(p.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

