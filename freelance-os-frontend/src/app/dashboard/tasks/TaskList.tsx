'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchWithToken } from '../../../lib/api';
import { TaskForm, TaskData } from './TaskForm';

type Project = { id: string; name: string };
type Task = TaskData & { id: string; project: Project };

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Task | null>(null);

  // Carga inicial de tareas y proyectos
  const loadAll = async () => {
    setLoading(true);
    try {
      const [tskRaw, prjRaw] = await Promise.all([
        fetchWithToken('/tasks', { method: 'GET' }),
        fetchWithToken('/projects', { method: 'GET' }),
      ]);
      // Mapea proyectos
      const mappedProjects: Project[] = (prjRaw as any[]).map((p) => ({
        id: p.id,
        name: p.name,
      }));
      setProjects(mappedProjects);
      setTasks(tskRaw as Task[]);
      toast.success('Datos de tareas y proyectos cargados');
    } catch (err: any) {
      console.error(err);
      toast.error(`Error cargando datos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  // Crear tarea
  const create = async (data: TaskData) => {
    try {
      await fetchWithToken('/tasks', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      toast.success('Tarea creada');
      loadAll();
    } catch (err: any) {
      console.error(err);
      toast.error(`Error al crear tarea: ${err.message}`);
    }
  };

  // Actualizar tarea
  const update = async (data: TaskData) => {
    if (!editing) return;
    try {
      await fetchWithToken(`/tasks/${editing.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      toast.success('Tarea actualizada');
      setEditing(null);
      loadAll();
    } catch (err: any) {
      console.error(err);
      toast.error(`Error al actualizar tarea: ${err.message}`);
    }
  };

  // Eliminar tarea
  const remove = async (id: string) => {
    try {
      await fetchWithToken(`/tasks/${id}`, { method: 'DELETE' });
      toast.success('Tarea eliminada');
      loadAll();
    } catch (err: any) {
      console.error(err);
      toast.error(`Error al eliminar tarea: ${err.message}`);
    }
  };

  if (loading) return <p className="p-4 text-center">Cargando tareas…</p>;

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
          <li
            key={t.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{t.title}</p>
              <p className="text-sm text-gray-600">Proyecto: {t.project.name}</p>
              <p className="text-sm text-gray-600">Estado: {t.status}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(t)}
                className="text-blue-500 hover:underline"
              >
                Editar
              </button>
              <button
                onClick={() => remove(t.id)}
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
