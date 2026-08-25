'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { coffeeShops, getCities } from '@/data/coffee-shops';
import { CoffeeShop } from '@/types';
import { track, AnalyticsEvents } from '@/lib/analytics';

const AMENITY_FILTERS = [
  { key: 'wifi', icon: '⚡', label: 'Fast WiFi' },
  { key: 'outlet', icon: '🔌', label: 'Power Outlet' },
  { key: 'quiet', icon: '🤫', label: 'Quiet' },
  { key: 'meeting', icon: '👥', label: 'Meeting Friendly' },
  { key: 'outdoor', icon: '🌳', label: 'Outdoor' },
  { key: 'ac', icon: '❄️', label: 'AC' },
];

const BUDGET_FILTERS = [
  { key: 'budget', label: '< Rp20K' },
  { key: 'moderate', label: 'Rp20K–40K' },
  { key: 'premium', label: '> Rp40K' },
];

export default function CoffeeListPage() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const cities = getCities();

  const filteredShops = useMemo(() => {
    return coffeeShops.filter((shop) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !shop.name.toLowerCase().includes(searchLower) &&
          !shop.description.toLowerCase().includes(searchLower) &&
          !shop.city.toLowerCase().includes(searchLower) &&
          !shop.district.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // City filter
      if (selectedCity && shop.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          shop.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Budget filter
      if (selectedBudget && shop.price_range !== selectedBudget) {
        return false;
      }

      return true;
    });
  }, [search, selectedCity, selectedAmenities, selectedBudget]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCity('');
    setSelectedAmenities([]);
    setSelectedBudget('');
    track(AnalyticsEvents.FILTER_CLEARED);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <main className="flex-1">
        {/* Header */}
        <div style={{ backgroundColor: 'var(--color-surface-soft)', padding: '32px 0' }}>
          <div className="container">
            <h1 className="text-display-xl" style={{ marginBottom: '8px' }}>
              Coffee Shops
            </h1>
            <p className="text-body-md" style={{ color: 'var(--color-muted)' }}>
              Temukan tempat kerja yang sempurna di Barlingmascakeb
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ borderBottom: '1px solid var(--color-hairline)', padding: '24px 0' }}>
          <div className="container">
            {/* Search Bar */}
            <div className="search-bar" style={{ marginBottom: '20px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Cari nama atau lokasi coffee shop..."
                className="search-bar-input"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (e.target.value.length > 2) {
                    track(AnalyticsEvents.SEARCH_PERFORMED, { query: e.target.value });
                  }
                }}
              />
            </div>

            {/* City Pills */}
            <div style={{ marginBottom: '16px' }}>
              <p className="text-caption" style={{ color: 'var(--color-muted)', marginBottom: '8px' }}>
                Kota
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedCity('')}
                  className={`filter-pill ${!selectedCity ? 'active' : ''}`}
                >
                  Semua
                </button>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city.toLowerCase())}
                    className={`filter-pill ${selectedCity === city.toLowerCase() ? 'active' : ''}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenity Filters */}
            <div style={{ marginBottom: '16px' }}>
              <p className="text-caption" style={{ color: 'var(--color-muted)', marginBottom: '8px' }}>
                Filter
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {AMENITY_FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => toggleAmenity(filter.key)}
                    className={`filter-pill ${selectedAmenities.includes(filter.key) ? 'active' : ''}`}
                  >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {BUDGET_FILTERS.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedBudget(selectedBudget === filter.key ? '' : filter.key)}
                    className={`filter-pill ${selectedBudget === filter.key ? 'active' : ''}`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              {(search || selectedCity || selectedAmenities.length > 0 || selectedBudget) && (
                <button
                  onClick={clearFilters}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', height: 'auto', fontSize: '14px' }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="section">
          <div className="container">
            <p className="text-body-sm" style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>
              {filteredShops.length} coffee shop{filteredShops.length !== 1 ? 's' : ''} ditemukan
            </p>

            {filteredShops.length > 0 ? (
              <div className="grid-cards">
                {filteredShops.map((shop) => (
                  <CoffeeShopCard key={shop.id} shop={shop} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '64px 0' }}>
                <p className="text-title-md" style={{ marginBottom: '8px' }}>
                  Tidak ada coffee shop yang cocok
                </p>
                <p className="text-body-sm" style={{ color: 'var(--color-muted)', marginBottom: '16px' }}>
                  Coba ubah filter atau kata kunci pencarian
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function CoffeeShopCard({ shop }: { shop: CoffeeShop }) {
  return (
    <Link
      href={`/coffee/${shop.slug}`}
      className="card"
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={shop.image_url || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800'}
          alt={shop.name}
          className="card-image"
          style={{ borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}
        />
        {shop.featured && (
          <span className="badge badge-featured" style={{ position: 'absolute', top: '12px', left: '12px' }}>
            ⭐ Featured
          </span>
        )}
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h3 className="text-title-md">{shop.name}</h3>
            <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
              {shop.city} · {shop.district}
            </p>
          </div>
          <div className="score-circle" style={{ width: '56px', height: '56px', fontSize: '18px', flexShrink: 0 }}>
            <span>{shop.founder_score}</span>
            <span className="score-label">Score</span>
          </div>
        </div>

        <p className="text-body-sm" style={{ marginTop: '12px', color: 'var(--color-body)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {shop.description}
        </p>

        <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {shop.amenities.slice(0, 4).map((amenity) => (
            <span key={amenity} className="amenity-badge">
              {amenity === 'wifi' && '⚡'}
              {amenity === 'outlet' && '🔌'}
              {amenity === 'quiet' && '🤫'}
              {amenity === 'meeting' && '👥'}
              {amenity === 'ac' && '❄️'}
              {amenity === 'outdoor' && '🌳'}
              {amenity}
            </span>
          ))}
        </div>

        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--color-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
            {shop.price_label}
          </span>
          <span className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
            {shop.opening_hours}
          </span>
        </div>
      </div>
    </Link>
  );
}
