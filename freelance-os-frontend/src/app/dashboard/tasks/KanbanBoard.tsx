'use client';

import { useEffect, useState } from 'react';
import { fetchWithToken } from '../../../lib/api';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import toast from 'react-hot-toast';

type Task = {
  id: string;
  title: string;
  status: 'Pendiente' | 'En progreso' | 'Terminada';
  project: { name: string };
};

type Columns = Record<Task['status'], Task[]>;

const STATUSES: Task['status'][] = ['Pendiente', 'En progreso', 'Terminada'];

export function KanbanBoard() {
  const [columns, setColumns] = useState<Columns>({
    Pendiente: [],
    'En progreso': [],
    Terminada: [],
  });
  const [loading, setLoading] = useState(true);

  // 1) Carga tareas y las organiza por estado
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = (await fetchWithToken('/tasks', { method: 'GET' })) as Task[];
      const cols: Columns = { Pendiente: [], 'En progreso': [], Terminada: [] };
      data.forEach((t) => {
        cols[t.status].push(t);
      });
      setColumns(cols);
    } catch (err: any) {
      toast.error(`Error al cargar tareas: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // 2) Al soltar, actualizar status en backend y frontend
  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    const from = source.droppableId as Task['status'];
    const to   = destination.droppableId as Task['status'];

    try {
      await fetchWithToken(`/tasks/${draggableId}`, {
        method: 'PUT',
        body: JSON.stringify({ status: to }),
      });
      // Mover en UI
      const sourceList = Array.from(columns[from]);
      const [moved] = sourceList.splice(source.index, 1);
      moved.status = to;
      const destList = Array.from(columns[to]);
      destList.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [from]: sourceList,
        [to]: destList,
      });
      toast.success(`Tarea movida a "${to}"`);
    } catch (err: any) {
      toast.error(`Error al mover tarea: ${err.message}`);
    }
  };

  if (loading) return <p className="p-4 text-center">Cargando Kanban…</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-auto p-4">
        {STATUSES.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 rounded p-4 w-64 flex-shrink-0"
              >
                <h3 className="text-lg font-semibold mb-2">{status}</h3>
                {columns[status].map((task, idx) => (
                  <Draggable draggableId={task.id} index={idx} key={task.id}>
                    {(prov) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className="bg-white p-3 rounded mb-2 shadow cursor-move"
                      >
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-gray-500">{task.project.name}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

