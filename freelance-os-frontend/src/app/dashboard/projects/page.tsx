'use client';
import { RequireAuth } from 'components/ui/requireAuth';
import { ProjectList } from '../projects/ProjectList';

export default function ProjectsPage() {
  return (
    <RequireAuth>
      <h2 className="text-2xl font-bold mb-2">Projects</h2>
      <p className="text-gray-700">Aquí podrás ver y administrar tus Projects.</p>
      <ProjectList/>
    </RequireAuth>
  );
}

