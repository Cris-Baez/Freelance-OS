'use client';

import { RequireAuth } from 'components/ui/requireAuth';
import { TaskList } from '../tasks/TaskList';
import { KanbanBoard } from '../tasks/KanbanBoard';

export default function TasksPage() {
  return (
    <RequireAuth>

        <h2 className="text-2xl font-bold mb-4">Tareas</h2>
        <button className="btn btn-primary">Botón Corporativo</button>
        <KanbanBoard/>
        <TaskList />
    </RequireAuth>
  );
}
