'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getCoffeeShopBySlug } from '@/data/coffee-shops';
import { getAmenityIcon, getIntentLabel } from '@/lib/utils';
import { track, AnalyticsEvents } from '@/lib/analytics';

const AMENITY_ICONS: Record<string, { icon: string; label: string }> = {
  wifi: { icon: '⚡', label: 'Fast WiFi' },
  outlet: { icon: '🔌', label: 'Power Outlet' },
  quiet: { icon: '🤫', label: 'Quiet' },
  meeting: { icon: '👥', label: 'Meeting Friendly' },
  outdoor: { icon: '🌳', label: 'Outdoor' },
  ac: { icon: '❄️', label: 'AC' },
  smoking: { icon: '🚬', label: 'Smoking Area' },
  parking: { icon: '🅿️', label: 'Parking' },
};

export default function CoffeeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const shop = getCoffeeShopBySlug(slug);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    intent: '',
    message: '',
  });

  if (!shop) {
    return (
      <div className="flex flex-col min-h-screen">
        <Nav />
        <div className="flex-1 flex items-center justify-center">
          <div style={{ textAlign: 'center' }}>
            <h1 className="text-display-lg" style={{ marginBottom: '16px' }}>Coffee Shop Not Found</h1>
            <Link href="/coffee" className="btn-primary">Back to Directory</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track(AnalyticsEvents.LEAD_FORM_SUBMIT, { coffee_shop: shop.name, city: shop.city });
    // In a real app, this would send to an API
    console.log('Lead submitted:', { ...leadForm, coffee_shop_id: shop.id });
    setLeadSubmitted(true);
  };

  const scores = [
    { label: 'WiFi', score: shop.wifi_score, weight: '20%' },
    { label: 'Colokan', score: shop.outlet_score, weight: '15%' },
    { label: 'Kenyamanan', score: shop.comfort_score, weight: '20%' },
    { label: 'Suasana', score: shop.noise_score, weight: '15%' },
    { label: 'Meeting', score: shop.meeting_score, weight: '10%' },
    { label: 'Tempat Duduk', score: shop.seating_score, weight: '10%' },
    { label: 'Jam Buka', score: shop.opening_hours ? 8 : 5, weight: '10%' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid var(--color-hairline)', padding: '16px 0' }}>
          <div className="container-narrow">
            <Link href="/coffee" style={{ fontSize: '14px', color: 'var(--color-muted)', textDecoration: 'none' }}>
              ← Back to Coffee Shops
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-narrow" style={{ padding: '32px var(--spacing-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px' }}>
            {/* Left Column - Main Info */}
            <div>
              {/* Header */}
              <div style={{ marginBottom: '24px' }}>
                <h1 className="text-display-lg" style={{ marginBottom: '8px' }}>
                  {shop.name}
                </h1>
                <p className="text-body-md" style={{ color: 'var(--color-muted)' }}>
                  {shop.address}, {shop.city}
                </p>
                {shop.featured && (
                  <span className="badge badge-featured" style={{ marginTop: '8px', display: 'inline-flex' }}>
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Image */}
              <img
                src={shop.image_url || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'}
                alt={shop.name}
                style={{ width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '32px' }}
              />

              {/* Founder Score */}
              <div style={{ marginBottom: '32px' }}>
                <h2 className="text-display-sm" style={{ marginBottom: '16px' }}>Founder Score</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div className="score-circle" style={{ width: '100px', height: '100px', fontSize: '32px' }}>
                    <span>{shop.founder_score}</span>
                    <span className="score-label">/10</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className="text-body-sm" style={{ color: 'var(--color-body)', marginBottom: '16px' }}>
                      Skor ini menunjukkan seberapa cocok tempat ini untuk solo founder dan solopreneur yang butuh tempat kerja yang produktif.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      {scores.map((item) => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="text-body-sm" style={{ color: 'var(--color-muted)' }}>{item.label}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-surface-strong)', borderRadius: '2px' }}>
                              <div style={{ width: `${item.score * 10}%`, height: '100%', backgroundColor: 'var(--color-primary)', borderRadius: '2px' }} />
                            </div>
                            <span className="text-body-sm" style={{ fontWeight: 500 }}>{item.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '32px' }}>
                <h2 className="text-display-sm" style={{ marginBottom: '12px' }}>Tentang Tempat Ini</h2>
                <p className="text-body-md" style={{ color: 'var(--color-body)' }}>{shop.description}</p>
              </div>

              {/* Amenities */}
              <div style={{ marginBottom: '32px' }}>
                <h2 className="text-display-sm" style={{ marginBottom: '16px' }}>Fasilitas</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {shop.amenities.map((amenity) => {
                    const amenityInfo = AMENITY_ICONS[amenity] || { icon: '•', label: amenity };
                    return (
                      <div key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '20px' }}>{amenityInfo.icon}</span>
                        <span className="text-body-sm">{amenityInfo.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '32px' }}>
                <div>
                  <h3 className="text-title-sm" style={{ marginBottom: '8px' }}>Jam Buka</h3>
                  <p className="text-body-md">{shop.opening_hours}</p>
                </div>
                <div>
                  <h3 className="text-title-sm" style={{ marginBottom: '8px' }}>Range Harga</h3>
                  <p className="text-body-md">{shop.price_label}</p>
                </div>
                <div>
                  <h3 className="text-title-sm" style={{ marginBottom: '8px' }}>Kota</h3>
                  <p className="text-body-md">{shop.city}</p>
                </div>
                <div>
                  <h3 className="text-title-sm" style={{ marginBottom: '8px' }}>District</h3>
                  <p className="text-body-md">{shop.district}</p>
                </div>
              </div>

              {/* External Links */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {shop.google_maps_url && (
                  <a
                    href={shop.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    onClick={() => track(AnalyticsEvents.DIRECTIONS_CLICK, { coffee_shop: shop.name })}
                  >
                    📍 Google Maps
                  </a>
                )}
                {shop.instagram_url && (
                  <a
                    href={shop.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    onClick={() => track(AnalyticsEvents.INSTAGRAM_CLICK, { coffee_shop: shop.name })}
                  >
                    📷 Instagram
                  </a>
                )}
                {shop.phone && (
                  <a
                    href={`tel:${shop.phone}`}
                    className="btn-secondary"
                    onClick={() => track(AnalyticsEvents.PHONE_CLICK, { coffee_shop: shop.name })}
                  >
                    📞 {shop.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Right Column - Lead CTA */}
            <div>
              <div className="lead-form" style={{ position: 'sticky', top: '100px' }}>
                {!leadSubmitted ? (
                  <>
                    <h3 className="text-display-sm" style={{ marginBottom: '8px' }}>
                      Tertarik dengan tempat ini?
                    </h3>
                    <p className="text-body-sm" style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>
                      Hubungi coffee shop ini untuk work space, meeting, atau event.
                    </p>

                    {!showLeadForm ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                          onClick={() => {
                            track(AnalyticsEvents.LEAD_FORM_OPEN, { coffee_shop: shop.name, city: shop.city });
                            setShowLeadForm(true);
                          }}
                          className="btn-primary"
                          style={{ width: '100%' }}
                        >
                          Ask Coffee Shop
                        </button>
                        <a
                          href={shop.google_maps_url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                          style={{ width: '100%', textAlign: 'center', textDecoration: 'none' }}
                        >
                          Get Directions
                        </a>
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit}>
                        <div className="form-group">
                          <label className="form-label">Nama</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="Nama kamu"
                            required
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email / WhatsApp</label>
                          <input
                            type="text"
                            className="input"
                            placeholder="email@ atau 08xx"
                            required
                            value={leadForm.email}
                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Apa yang kamu butuhkan?</label>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {['work_space', 'meeting', 'event', 'community_meetup', 'collaboration', 'other'].map((intent) => (
                              <label key={intent} className="form-checkbox">
                                <input
                                  type="radio"
                                  name="intent"
                                  value={intent}
                                  checked={leadForm.intent === intent}
                                  onChange={(e) => setLeadForm({ ...leadForm, intent: e.target.value })}
                                />
                                <span className="text-body-sm">{getIntentLabel(intent)}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Pesan (opsional)</label>
                          <textarea
                            className="textarea"
                            placeholder="Ceritakan kebutuhan kamu..."
                            value={leadForm.message}
                            onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                          />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowLeadForm(false)}
                          className="btn-secondary"
                          style={{ width: '100%', marginTop: '8px' }}
                        >
                          Cancel
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                    <h3 className="text-display-sm" style={{ marginBottom: '8px' }}>Terima Kasih!</h3>
                    <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
                      Lead kamu sudah tersimpan. Coffee shop akan menghubungi kamu soon.
                    </p>
                  </div>
                )}

                {/* Share */}
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-hairline)' }}>
                  <p className="text-body-sm" style={{ color: 'var(--color-muted)', marginBottom: '12px' }}>
                    ☕ Tahu tempat yang lebih baik?
                  </p>
                  <Link href="/submit" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                    Submit coffee shop baru →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
