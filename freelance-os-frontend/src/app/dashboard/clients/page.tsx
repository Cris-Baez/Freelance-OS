'use client';
import { ClientList} from "./ClientList";
import DashboardLayout from "../layout";
import { RequireAuth } from "components/ui/requireAuth";
export default function ClientsPage() {
  return (
    <RequireAuth>
      <div>
        <h2 className="text-2xl font-bold mb-4">Clientes</h2>
        <ClientList />
      </div>
    </RequireAuth>
  );
}


