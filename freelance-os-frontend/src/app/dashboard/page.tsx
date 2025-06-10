// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { RequireAuth } from 'components/ui/requireAuth';
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card';
import { Activity, List, Users, FileText } from 'lucide-react';
import { fetchWithToken } from '../../lib/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Metrics = {
  clients: number;
  projects: number;
  tasks: number;
  invoices: number;
  projectStatus: { status: string; count: number }[];
};

export default function DashboardHome() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      const [clients, projects, tasks, invoices] = await Promise.all([
        fetchWithToken('/clients', { method: 'GET' }),
        fetchWithToken('/projects', { method: 'GET' }),
        fetchWithToken('/tasks', { method: 'GET' }),
        fetchWithToken('/invoices', { method: 'GET' }),
      ]);
      // Agrupar proyectos por estado
      const statusCount = (projects as any[]).reduce<Record<string, number>>((acc, p) => {
        acc[p.status] = (acc[p.status] || 0) + 1;
        return acc;
      }, {});
      const projectStatus = Object.entries(statusCount).map(([status, count]) => ({ status, count }));
      setMetrics({
        clients: (clients as any[]).length,
        projects: (projects as any[]).length,
        tasks: (tasks as any[]).length,
        invoices: (invoices as any[]).length,
        projectStatus,
      });
    }
    loadMetrics();
  }, []);

  return (
    <RequireAuth>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              <CardTitle>Clientes</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {metrics?.clients ?? '—'}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-2">
              <List className="w-6 h-6 text-green-500" />
              <CardTitle>Proyectos</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {metrics?.projects ?? '—'}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-orange-500" />
              <CardTitle>Tareas</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {metrics?.tasks ?? '—'}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-500" />
              <CardTitle>Facturas</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {metrics?.invoices ?? '—'}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Proyectos por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics?.projectStatus || []}>
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
    </RequireAuth>
  );
}


