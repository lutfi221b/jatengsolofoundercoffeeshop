'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getCities } from '@/data/coffee-shops';
import { track, AnalyticsEvents } from '@/lib/analytics';

export default function SubmitPage() {
  const cities = getCities();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    google_maps_url: '',
    instagram_url: '',
    phone: '',
    opening_hours: '',
    price_range: '',
    wifi: false,
    outlet: false,
    meeting: false,
    quiet: false,
    outdoor: false,
    ac: false,
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track(AnalyticsEvents.SUBMISSION_SUBMIT, { city: formData.city });
    // In a real app, this would send to an API
    console.log('Submission:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Nav />
        <div className="flex-1 flex items-center justify-center" style={{ padding: '64px 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>✅</div>
            <h1 className="text-display-lg" style={{ marginBottom: '16px' }}>
              Terima Kasih!
            </h1>
            <p className="text-body-md" style={{ color: 'var(--color-muted)', marginBottom: '32px' }}>
              Submission kamu sudah masuk dan akan direview oleh admin. Biasanya memakan waktu 1-2 hari kerja.
            </p>
            <Link href="/coffee" className="btn-primary">
              Browse Coffee Shops
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <div style={{ backgroundColor: 'var(--color-surface-soft)', padding: '48px 0' }}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <h1 className="text-display-xl" style={{ marginBottom: '12px' }}>
              Add Your Coffee Shop
            </h1>
            <p className="text-body-md" style={{ color: 'var(--color-muted)', maxWidth: '500px', margin: '0 auto' }}>
              Punya coffee shop favorit yang belum ada di daftar kami? Bantu kami membangun directory yang lebih lengkap!
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="section">
          <div className="container-narrow">
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
              {/* Basic Info */}
              <div style={{ marginBottom: '48px' }}>
                <h2 className="text-display-sm" style={{ marginBottom: '24px' }}>Basic Information</h2>

                <div className="form-group">
                  <label className="form-label">Coffee Shop Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Contoh: Kopi Joss Purwokerto"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <select
                    name="city"
                    className="input"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">Pilih kota...</option>
                    {cities.map((city) => (
                      <option key={city} value={city.toLowerCase()}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Address *</label>
                  <input
                    type="text"
                    name="address"
                    className="input"
                    placeholder="Jl. Nama Jalan No. X, Kelurahan, Kecamatan"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Google Maps URL</label>
                  <input
                    type="url"
                    name="google_maps_url"
                    className="input"
                    placeholder="https://maps.google.com/..."
                    value={formData.google_maps_url}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Instagram URL</label>
                  <input
                    type="url"
                    name="instagram_url"
                    className="input"
                    placeholder="https://instagram.com/..."
                    value={formData.instagram_url}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    placeholder="0812-3456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Details */}
              <div style={{ marginBottom: '48px' }}>
                <h2 className="text-display-sm" style={{ marginBottom: '24px' }}>Details</h2>

                <div className="form-group">
                  <label className="form-label">Opening Hours *</label>
                  <input
                    type="text"
                    name="opening_hours"
                    className="input"
                    placeholder="Contoh: 07:00 - 22:00"
                    required
                    value={formData.opening_hours}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Price Range *</label>
                  <select
                    name="price_range"
                    className="input"
                    required
                    value={formData.price_range}
                    onChange={handleChange}
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="">Pilih range harga...</option>
                    <option value="budget">&lt; Rp20K</option>
                    <option value="moderate">Rp20K–40K</option>
                    <option value="premium">&gt; Rp40K</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    className="textarea"
                    placeholder="Ceritakan tentang coffee shop ini. Apa yang membuatnya cocok untuk kerja?"
                    required
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Amenities */}
              <div style={{ marginBottom: '48px' }}>
                <h2 className="text-display-sm" style={{ marginBottom: '24px' }}>Amenities</h2>
                <p className="text-body-sm" style={{ color: 'var(--color-muted)', marginBottom: '16px' }}>
                  Pilih fasilitas yang tersedia di coffee shop ini.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {[
                    { key: 'wifi', label: '⚡ Fast WiFi' },
                    { key: 'outlet', label: '🔌 Power Outlet / Colokan' },
                    { key: 'meeting', label: '👥 Meeting Friendly' },
                    { key: 'quiet', label: '🤫 Quiet / Tenang' },
                    { key: 'outdoor', label: '🌳 Outdoor / Area Terbuka' },
                    { key: 'ac', label: '❄️ AC' },
                  ].map((amenity) => (
                    <label key={amenity.key} className="form-checkbox" style={{ padding: '12px', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                      <input
                        type="checkbox"
                        name={amenity.key}
                        checked={formData[amenity.key as keyof typeof formData] as boolean}
                        onChange={handleChange}
                      />
                      <span className="text-body-sm">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div style={{ textAlign: 'center' }}>
                <p className="text-body-sm" style={{ color: 'var(--color-muted)', marginBottom: '16px' }}>
                  Semua submission akan direview sebelum ditampilkan di directory.
                </p>
                <button type="submit" className="btn-primary" style={{ minWidth: '200px' }}>
                  Submit Coffee Shop
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
