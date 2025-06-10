'use client';

import { RequireAuth } from '../../components/ui/requireAuth';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}
