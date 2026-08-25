'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Lead } from '@/types';
import { getIntentLabel } from '@/lib/utils';

// Mock leads data
const mockLeads: Lead[] = [
  {
    id: '1',
    coffee_shop_id: '1',
    coffee_shop_name: 'Kopi Joss Purwokerto',
    name: 'Ahmad Rizki',
    email: 'ahmad@email.com',
    phone: '0812-3456-7890',
    intent: 'work_space',
    message: 'Mau tanya soal work space untuk 1 orang, bisa daily pass?',
    status: 'new',
    created_at: '2026-08-25T10:00:00Z',
  },
  {
    id: '2',
    coffee_shop_id: '2',
    coffee_shop_name: 'Seblak & Kopi Cabbin',
    name: 'Diana Putri',
    email: 'diana@gmail.com',
    phone: '0857-9876-5432',
    intent: 'meeting',
    message: 'Butuh tempat meeting untuk 5 orang, apakah ada private room?',
    status: 'contacted',
    created_at: '2026-08-24T14:30:00Z',
  },
  {
    id: '3',
    coffee_shop_id: '5',
    coffee_shop_name: 'Ruang Tinggal Coffee',
    name: 'Budi Santoso',
    email: 'budi@startup.io',
    intent: 'event',
    message: 'Interested untuk hosting workshopcoding untuk 20 orang.',
    status: 'qualified',
    created_at: '2026-08-23T09:15:00Z',
  },
  {
    id: '4',
    coffee_shop_id: '7',
    coffee_shop_name: 'Kedai 89 Purbalingga',
    name: 'Clara Wijaya',
    email: 'clara@design.co',
    intent: 'work_space',
    message: 'Mau daftar bulanan untuk remote work.',
    status: 'converted',
    created_at: '2026-08-22T16:45:00Z',
  },
  {
    id: '5',
    coffee_shop_id: '3',
    coffee_shop_name: 'Dewandtu Coffee',
    name: 'Eko Prasetyo',
    email: 'eko@freelance.id',
    intent: 'collaboration',
    message: 'Tanya soal kolaborasi untuk UI/UX workshop.',
    status: 'new',
    created_at: '2026-08-25T08:00:00Z',
  },
  {
    id: '6',
    coffee_shop_id: '14',
    coffee_shop_name: 'Brewok Coffee House',
    name: 'Fani Natalia',
    email: 'fani@agency.com',
    intent: 'meeting',
    message: 'Monthly team meeting untuk 8 orang.',
    status: 'closed',
    created_at: '2026-08-20T11:30:00Z',
  },
];

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'converted', 'closed'] as const;
type StatusType = typeof STATUS_OPTIONS[number];

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter && lead.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !lead.name.toLowerCase().includes(query) &&
        !lead.email.toLowerCase().includes(query) &&
        !lead.coffee_shop_name?.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    return true;
  });

  const updateLeadStatus = (leadId: string, newStatus: StatusType) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    );
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    converted: leads.filter((l) => l.status === 'converted').length,
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'status-new';
      case 'contacted':
        return 'status-contacted';
      case 'qualified':
        return 'status-qualified';
      case 'converted':
        return 'status-converted';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <div style={{ backgroundColor: 'var(--color-surface-soft)', padding: '32px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 className="text-display-xl" style={{ marginBottom: '4px' }}>Admin Dashboard</h1>
                <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
                  Kelola leads dan coffee shop submissions
                </p>
              </div>
              <Link href="/submit" className="btn-secondary">
                + Add Coffee Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ borderBottom: '1px solid var(--color-hairline)', padding: '24px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
              <StatCard label="Total Leads" value={stats.total} />
              <StatCard label="New" value={stats.new} color="var(--color-primary)" />
              <StatCard label="Contacted" value={stats.contacted} color="#1565c0" />
              <StatCard label="Qualified" value={stats.qualified} color="#e65100" />
              <StatCard label="Converted" value={stats.converted} color="#7b1fa2" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ borderBottom: '1px solid var(--color-hairline)', padding: '20px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="search-bar" style={{ marginBottom: 0, flex: 1, minWidth: '300px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="search-bar-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setStatusFilter('')}
                  className={`filter-pill ${!statusFilter ? 'active' : ''}`}
                >
                  All
                </button>
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`filter-pill ${statusFilter === status ? 'active' : ''}`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="section">
          <div className="container">
            {filteredLeads.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-hairline)' }}>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)' }}>
                        Name
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)' }}>
                        Coffee Shop
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)' }}>
                        Intent
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)' }}>
                        Date
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)' }}>
                        Status
                      </th>
                      <th style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600, fontSize: '14px', color: 'var(--color-muted)' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid var(--color-hairline-soft)' }}>
                        <td style={{ padding: '16px' }}>
                          <div>
                            <p className="text-body-sm" style={{ fontWeight: 500 }}>{lead.name}</p>
                            <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>{lead.email}</p>
                            {lead.phone && (
                              <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>{lead.phone}</p>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <p className="text-body-sm">{lead.coffee_shop_name || '-'}</p>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <p className="text-body-sm">{getIntentLabel(lead.intent)}</p>
                          {lead.message && (
                            <p className="text-body-sm" style={{ color: 'var(--color-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lead.message}
                            </p>
                          )}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
                            {formatDate(lead.created_at)}
                          </p>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as StatusType)}
                            className={`status-badge ${getStatusBadgeClass(lead.status)}`}
                            style={{ cursor: 'pointer', border: 'none' }}
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <Link
                            href={`/coffee/${lead.coffee_shop_id}`}
                            className="btn-secondary"
                            style={{ padding: '6px 12px', height: 'auto', fontSize: '12px' }}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p className="text-title-md" style={{ marginBottom: '8px' }}>No leads found</p>
                <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
                  {searchQuery || statusFilter ? 'Try adjusting your filters' : 'Leads will appear here when users submit inquiries'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div style={{ backgroundColor: 'var(--color-surface-soft)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
      <p style={{ fontSize: '32px', fontWeight: 700, color: color || 'var(--color-ink)', marginBottom: '4px' }}>
        {value}
      </p>
      <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
        {label}
      </p>
    </div>
  );
}
