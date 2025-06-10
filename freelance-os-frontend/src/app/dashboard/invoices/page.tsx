'use client';
import { RequireAuth } from 'components/ui/requireAuth';
import { InvoiceList } from '../invoices/InvoiceList';

export default function InvoicesPage() {
  return (
    <RequireAuth>
        <h2 className="text-2xl font-bold mb-4">Facturas</h2>
        <InvoiceList />
    </RequireAuth>
  );
}
