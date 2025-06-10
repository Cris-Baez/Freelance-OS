'use client';

import { useEffect, useState } from 'react';
import { ClientForm, ClientData } from './ClientForm';
import { fetchWithToken } from '../../../lib/api';

type Client = {
  id: string;
  name: string;
  email: string;
};

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<ClientData | undefined>(undefined);

  const loadClients = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchWithToken('/clients', { method: 'GET' });
      setClients(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const addClient = async (newClient: ClientData) => {
    setError('');
    try {
      await fetchWithToken('/clients', {
        method: 'POST',
        body: JSON.stringify(newClient),
      });
      await loadClients();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateClient = async (data: ClientData) => {
    if (!editingId) return;
    setError('');
    try {
      await fetchWithToken(`/clients/${editingId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      setEditingId(null);
      setEditingData(undefined);
      await loadClients();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteClient = async (id: string) => {
    setError('');
    try {
      await fetchWithToken(`/clients/${id}`, { method: 'DELETE' });
      await loadClients();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEdit = (client: Client) => {
    setEditingId(client.id);
    setEditingData({ name: client.name, email: client.email });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingData(undefined);
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded shadow">
      {/* Formulario: modo crear o editar */}
      <ClientForm
        initialData={editingData}
        onCreate={addClient}
        onUpdate={updateClient}
        onCancel={cancelEdit}
      />

      {loading && <p>Cargando clientes…</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && (
        <ul className="space-y-4">
          {clients.map((client) => (
            <li
              key={client.id}
              className="border p-4 rounded shadow flex justify-between items-center bg-white"
            >
              <div>
                <p className="font-semibold">{client.name}</p>
                <p className="text-gray-600 text-sm">{client.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(client)}
                  className="text-blue-500 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteClient(client.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


