'use client';
import { useState } from 'react';

type Props = { onCreate: (data: { projectId: string; amount: number; description?: string }) => void; projects: { id: string; name: string }[]; };

export const InvoiceForm = ({ onCreate, projects }: Props) => {
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ projectId, amount: parseFloat(amount), description });
    setAmount(''); setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-4">
      <h2 className="text-xl font-bold">Nueva Factura</h2>
      <div>
        <label>Proyecto</label>
        <select value={projectId} onChange={(e)=>setProjectId(e.target.value)} className="border p-2 w-full">
          {projects.map(p=> <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div>
        <label>Monto</label>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="border p-2 w-full" required />
      </div>
      <div>
        <label>Descripción</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear Factura</button>
    </form>
  );
};
