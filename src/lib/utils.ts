import { CoffeeShop } from '@/types';

export function calculateFounderScore(shop: Partial<CoffeeShop>): number {
  const weights = {
    wifi: 0.20,
    outlet: 0.15,
    comfort: 0.20,
    noise: 0.15,
    meeting: 0.10,
    seating: 0.10,
    opening: 0.10,
  };

  const score =
    (shop.wifi_score || 0) * weights.wifi +
    (shop.outlet_score || 0) * weights.outlet +
    (shop.comfort_score || 0) * weights.comfort +
    (shop.noise_score || 0) * weights.noise +
    (shop.meeting_score || 0) * weights.meeting +
    (shop.seating_score || 0) * weights.seating +
    (shop.opening_hours ? 8 : 5) * weights.opening;

  return Math.round(score * 10) / 10;
}

export function formatPriceRange(price: string): string {
  switch (price) {
    case 'budget':
      return '< Rp20K';
    case 'moderate':
      return 'Rp20K–40K';
    case 'premium':
      return '> Rp40K';
    default:
      return price;
  }
}

export function getCityLabel(city: string): string {
  const labels: Record<string, string> = {
    Banyumas: 'Banyumas',
    Purbalingga: 'Purbalingga',
    Banjarnegara: 'Banjarnegara',
    Cilacap: 'Cilacap',
    Kebumen: 'Kebumen',
  };
  return labels[city] || city;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getAmenityIcon(amenity: string): string {
  const icons: Record<string, string> = {
    wifi: '⚡',
    outlet: '🔌',
    quiet: '🤫',
    meeting: '👥',
    outdoor: '🌳',
    ac: '❄️',
    smoking: '🚬',
    parking: '🅿️',
    '24h': '🕐',
  };
  return icons[amenity.toLowerCase()] || '•';
}

export function getIntentLabel(intent: string): string {
  const labels: Record<string, string> = {
    work_space: 'Work Space',
    meeting: 'Meeting',
    event: 'Event',
    community_meetup: 'Community Meetup',
    collaboration: 'Collaboration',
    other: 'Other',
  };
  return labels[intent] || intent;
}
