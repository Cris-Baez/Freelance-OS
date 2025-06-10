'use client';
import { useEffect, useState } from 'react';
import { fetchWithToken } from '../../../lib/api';
import { InvoiceForm } from './InvoiceForm';

type Invoice = { id:string; project:{name:string}; amount:number; issuedAt:string; description?:string };
type Project = { id:string; name:string };

export const InvoiceList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async() => {
    setLoading(true);
    const [inv, prj] = await Promise.all([
      fetchWithToken('/invoices',{method:'GET'}),
      fetchWithToken('/projects',{method:'GET'}),
    ]);
    setInvoices(inv);
    setProjects(prj.map((p:any)=>({id:p.id,name:p.name})));
    setLoading(false);
  };

  useEffect(()=>{load()},[]);

  const create = async(data:{projectId:string;amount:number;description?:string})=>{
    await fetchWithToken('/invoices',{method:'POST',body:JSON.stringify(data)});
    load();
  };
  const remove = async(id:string)=>{
    await fetchWithToken(`/invoices/${id}`,{method:'DELETE'});
    load();
  };

  if(loading) return <p>Cargando facturas…</p>;

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded shadow">
      <InvoiceForm onCreate={create} projects={projects} />
      <ul className="space-y-4">
        {invoices.map(inv=>(
          <li key={inv.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p className="font-bold">Proyecto: {inv.project.name}</p>
              <p>Monto: {inv.amount}</p>
              <p>Fecha: {new Date(inv.issuedAt).toLocaleDateString()}</p>
              {inv.description && <p>{inv.description}</p>}
            </div>
            <button onClick={()=>remove(inv.id)} className="text-red-500">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
