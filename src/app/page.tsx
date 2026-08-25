import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getFeaturedShops, getCities } from '@/data/coffee-shops';
import { formatPriceRange } from '@/lib/utils';

export default function HomePage() {
  const featuredShops = getFeaturedShops().slice(0, 4);
  const cities = getCities();

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Coffee shops for people building things.
          </h1>
          <p className="hero-subtitle">
            Temukan coffee shop yang cocok buat kerja, ngoding, meeting, dan membangun bisnis di Barlingmascakeb.
          </p>

          {/* Search Bar */}
          <div className="search-bar" style={{ marginBottom: '32px' }}>
            <input
              type="text"
              placeholder="Cari coffee shop atau kota..."
              className="search-bar-input"
            />
            <button className="search-orb" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/coffee" className="btn-primary">
              Explore Coffee Shops →
            </Link>
            <Link href="/submit" className="btn-secondary">
              Add Your Coffee Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Built for Solo Founders */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="text-display-lg" style={{ marginBottom: '16px' }}>
              Built for Solo Founders
            </h2>
            <p className="text-body-md" style={{ color: 'var(--color-body)' }}>
              Bukan sekadar coffee shop directory. Kami membantu kamu menemukan tempat yang cocok untuk fokus, meeting, dan membangun sesuatu.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Icons */}
      <section className="section">
        <div className="container">
          <h3 className="text-display-sm" style={{ textAlign: 'center', marginBottom: '24px' }}>
            Apa yang kamu butuhkan?
          </h3>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: '⚡', label: 'Fast WiFi' },
              { icon: '🔌', label: 'Power Outlet' },
              { icon: '🤫', label: 'Quiet' },
              { icon: '👥', label: 'Meeting Friendly' },
              { icon: '❄️', label: 'AC' },
              { icon: '🌙', label: 'Open Late' },
            ].map((filter) => (
              <Link
                key={filter.label}
                href={`/coffee?filter=${filter.label.toLowerCase().replace(' ', '-')}`}
                className="filter-pill"
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Coffee Shops */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="text-display-md">Featured Coffee Shops</h2>
            <Link href="/coffee" className="btn-secondary" style={{ padding: '10px 20px', height: 'auto', fontSize: '14px' }}>
              View All →
            </Link>
          </div>

          <div className="grid-cards">
            {featuredShops.map((shop) => (
              <Link key={shop.id} href={`/coffee/${shop.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    <div>
                      <h3 className="text-title-md">{shop.name}</h3>
                      <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
                        {shop.city}
                      </p>
                    </div>
                    <div className="score-circle" style={{ width: '56px', height: '56px', fontSize: '18px' }}>
                      <span>{shop.founder_score}</span>
                      <span className="score-label">Score</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {shop.amenities.slice(0, 3).map((amenity) => (
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

                  <p className="text-body-sm" style={{ marginTop: '12px', color: 'var(--color-muted)' }}>
                    {shop.price_label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by City */}
      <section className="section" style={{ backgroundColor: 'var(--color-surface-soft)' }}>
        <div className="container">
          <h2 className="text-display-md" style={{ marginBottom: '24px' }}>
            Browse by City
          </h2>
          <div className="city-grid">
            {cities.map((city) => (
              <Link key={city} href={`/coffee?city=${city.toLowerCase()}`} className="city-card">
                <h3 className="text-title-md">{city}</h3>
                <p className="text-body-sm" style={{ color: 'var(--color-muted)' }}>
                  Lihat coffee shops →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="text-display-lg" style={{ marginBottom: '16px' }}>
            Punya coffee shop favorit?
          </h2>
          <p className="text-body-md" style={{ color: 'var(--color-body)', marginBottom: '24px' }}>
            Bantu kami membangun directory ini dengan menambahkan coffee shop yang kamu tahu.
          </p>
          <Link href="/submit" className="btn-primary">
            Add Your Coffee Shop →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
