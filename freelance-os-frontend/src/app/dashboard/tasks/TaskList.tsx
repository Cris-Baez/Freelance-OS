'use client';

import { useEffect, useState } from 'react';
import { fetchWithToken } from '../../../lib/api';
import { TaskForm, TaskData } from './TaskForm';

type RawProject = { id: string; name?: string; title?: string };
type Project = { id: string; name: string };
type Task = TaskData & { id: string; project: Project };

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Task | null>(null);

  const loadAll = async () => {
    setLoading(true);
    try {
      // 1) Traer tareas y proyectos
      const [tskRaw, prjRaw] = await Promise.all([
        fetchWithToken('/tasks',    { method: 'GET' }),
        fetchWithToken('/projects', { method: 'GET' }),
      ]);

      // 2) Loguear proyectos crudos
      console.log('Proyectos crudos:', prjRaw);

      // 3) Mapear proyectos usando name o title
      const mapped: Project[] = (prjRaw as RawProject[]).map((p) => ({
        id: p.id,
        name: p.name ?? p.title ?? 'Sin nombre',
      }));

      console.log('Proyectos mapeados:', mapped);

      // 4) Guardar en estado
      setTasks(tskRaw as Task[]);
      setProjects(mapped);
    } catch (err) {
      console.error('Error cargando tareas/proyectos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const create = async (data: TaskData) => {
    await fetchWithToken('/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    loadAll();
  };

  const update = async (data: TaskData) => {
    if (!editing) return;
    await fetchWithToken(`/tasks/${editing.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    setEditing(null);
    loadAll();
  };

  const remove = async (id: string) => {
    await fetchWithToken(`/tasks/${id}`, { method: 'DELETE' });
    loadAll();
  };

  if (loading) return <p>Cargando tareas…</p>;

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded shadow">
      <TaskForm
        projects={projects}
        initial={editing || undefined}
        onCreate={create}
        onUpdate={update}
        onCancel={() => setEditing(null)}
      />

      <ul className="space-y-4">
        {tasks.map((t) => (
          <li key={t.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p className="font-bold">{t.title}</p>
              <p className="text-sm text-gray-600">Proyecto: {t.project.name}</p>
              <p className="text-sm text-gray-600">Estado: {t.status}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(t)} className="text-blue-500">
                Editar
              </button>
              <button onClick={() => remove(t.id)} className="text-red-500">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};