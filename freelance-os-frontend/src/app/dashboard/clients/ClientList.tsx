'use client';

import { useEffect, useState } from 'react';
import { ClientForm, ClientData } from './ClientForm';
import { fetchWithToken } from '../../../lib/api';
import { toast } from "react-hot-toast"; 
import { motion } from "framer-motion";

type Client = { id: string; name: string; email: string };

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    setLoading(true);
    try {
      const data: Client[] = await fetchWithToken('/clients', { method: 'GET' });
      setClients(data);
    } catch (err: any) {
      toast.error(`Error al cargar clientes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const addClient = async (newClient: { name: string; email: string }) => {
    try {
      await fetchWithToken('/clients', {
        method: 'POST',
        body: JSON.stringify(newClient),
      });
      toast.success('Cliente creado correctamente');
      await loadClients();
    } catch (err: any) {
      toast.error(`Error al crear cliente: ${err.message}`);
    }
  };

  const updateClient = async (id: string, updated: { name: string; email: string }) => {
    try {
      await fetchWithToken(`/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updated),
      });
      toast.success('Cliente actualizado correctamente');
      await loadClients();
    } catch (err: any) {
      toast.error(`Error al actualizar cliente: ${err.message}`);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await fetchWithToken(`/clients/${id}`, { method: 'DELETE' });
      toast.success('Cliente eliminado correctamente');
      await loadClients();
    } catch (err: any) {
      toast.error(`Error al eliminar cliente: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded shadow">
      <ClientForm onCreate={addClient} />

      {loading ? (
        <p>Cargando clientes…</p>
      ) : (
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
                  onClick={() => updateClient(client.id, { name: client.name, email: client.email })}
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

