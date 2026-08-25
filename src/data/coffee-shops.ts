import { CoffeeShop } from '@/types';
import { calculateFounderScore } from '@/lib/utils';

const rawShops: Omit<CoffeeShop, 'founder_score'>[] = [
  {
    id: '1',
    name: 'Kopi Joss Purwokerto',
    slug: 'kopi-joss-purwokerto',
    city: 'Banyumas',
    district: 'Purwokerto Selatan',
    address: 'Jl. Mgr. Soegijopranoto No. 21, Purwokerto',
    google_maps_url: 'https://maps.google.com/?q=Kopi+Joss+Purwokerto',
    instagram_url: 'https://instagram.com/kopijospurwokerto',
    phone: '0812-3456-7890',
    description: 'Kopi Joss adalah kedai kopi legendaris di Purwokerto dengan suasana klasik yang cocok untuk bekerja. WiFi cepat dan banyak colokan.',
    price_range: 'budget',
    price_label: '< Rp20K',
    wifi_score: 8,
    outlet_score: 9,
    comfort_score: 7,
    noise_score: 6,
    meeting_score: 5,
    seating_score: 7,
    opening_hours: '07:00 - 22:00',
    featured: true,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'ac', 'quiet'],
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    created_at: '2026-08-01',
    updated_at: '2026-08-25',
  },
  {
    id: '2',
    name: 'Seblak & Kopi Cabbin',
    slug: 'seblak-kopi-cabbin-purwokerto',
    city: 'Banyumas',
    district: 'Purwokerto Timur',
    address: 'Jl. Overste ISKandar No. 15, Purwokerto',
    description: 'Tempat unik dengan kombinasi seblak dan kopi. Suasana modern dengan meja panjang yang cocok untuk kerja bareng.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 9,
    outlet_score: 8,
    comfort_score: 8,
    noise_score: 5,
    meeting_score: 7,
    seating_score: 8,
    opening_hours: '10:00 - 23:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'meeting', 'ac'],
    image_url: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800',
    created_at: '2026-08-02',
    updated_at: '2026-08-25',
  },
  {
    id: '3',
    name: 'Dewandtu Coffee',
    slug: 'dewandtu-coffee-purwokerto',
    city: 'Banyumas',
    district: 'Purwokerto Utara',
    address: 'Jl. Tersakyatan No. 8, Purwokerto',
    description: 'Coffee shop minimalis dengan nuansa industrial. Favorit para developer dan freelancer lokal.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 9,
    outlet_score: 9,
    comfort_score: 9,
    noise_score: 8,
    meeting_score: 6,
    seating_score: 7,
    opening_hours: '08:00 - 21:00',
    featured: true,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'quiet', 'ac'],
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    created_at: '2026-08-03',
    updated_at: '2026-08-25',
  },
  {
    id: '4',
    name: 'Kedai Kopi Sokanadi',
    slug: 'kedai-kopi-sokanadi-purwokerto',
    city: 'Banyumas',
    district: 'Purwokerto Barat',
    address: 'Jl. Sokanadi No. 1, Purwokerto',
    description: 'Kedai kopi klasik dengan pilihan kopi tradisional dan modern. Tempat tenang untuk membaca dan bekerja.',
    price_range: 'budget',
    price_label: '< Rp20K',
    wifi_score: 7,
    outlet_score: 6,
    comfort_score: 7,
    noise_score: 8,
    meeting_score: 4,
    seating_score: 6,
    opening_hours: '06:30 - 21:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'quiet', 'outdoor'],
    image_url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
    created_at: '2026-08-04',
    updated_at: '2026-08-25',
  },
  {
    id: '5',
    name: 'Ruang Tinggal Coffee',
    slug: 'ruang-tinggal-coffee-purwokerto',
    city: 'Banyumas',
    district: 'Purwokerto Selatan',
    address: 'Jl. Sudagaran No. 12, Purwokerto',
    description: 'Coffee shop dengan konsep living room. Nyaman untuk kerja santai dan meeting informal.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 8,
    outlet_score: 8,
    comfort_score: 9,
    noise_score: 7,
    meeting_score: 8,
    seating_score: 8,
    opening_hours: '09:00 - 22:00',
    featured: true,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'meeting', 'ac', 'quiet'],
    image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    created_at: '2026-08-05',
    updated_at: '2026-08-25',
  },
  {
    id: '6',
    name: 'Kopi Teto\'l Purbalingga',
    slug: 'kopi-tetol-purbalingga',
    city: 'Purbalingga',
    district: 'Purbalingga',
    address: 'Jl. Tentara Pelajar No. 8, Purbalingga',
    description: 'Kedai kopi lokal dengan suasana asri. Parkiran luas dan cocok untuk meeting outdoor.',
    price_range: 'budget',
    price_label: '< Rp20K',
    wifi_score: 7,
    outlet_score: 5,
    comfort_score: 7,
    noise_score: 7,
    meeting_score: 6,
    seating_score: 7,
    opening_hours: '07:00 - 21:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'outdoor', 'parking'],
    image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    created_at: '2026-08-06',
    updated_at: '2026-08-25',
  },
  {
    id: '7',
    name: 'Kedai 89 Purbalingga',
    slug: 'kedai-89-purbalingga',
    city: 'Purbalingga',
    district: 'Purbalingga',
    address: 'Jl. Achmad Yani No. 89, Purbalingga',
    description: 'Coffee shop modern dengan interior industrial. WiFi kenceng dan cocok buat ngoding.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 9,
    outlet_score: 9,
    comfort_score: 8,
    noise_score: 6,
    meeting_score: 7,
    seating_score: 7,
    opening_hours: '10:00 - 22:00',
    featured: true,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'ac', 'meeting'],
    image_url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800',
    created_at: '2026-08-07',
    updated_at: '2026-08-25',
  },
  {
    id: '8',
    name: 'Warung Kopi Mantep',
    slug: 'warung-kopi-mantep-banjarnegara',
    city: 'Banjarnegara',
    district: 'Banjarnegara',
    address: 'Jl. Letjend Suparmo No. 45, Banjarnegara',
    description: 'Tempat nongkrong lokal dengan kopi arabika Banjarnegara. Suasana nyaman dan terjangkau.',
    price_range: 'budget',
    price_label: '< Rp20K',
    wifi_score: 6,
    outlet_score: 5,
    comfort_score: 6,
    noise_score: 7,
    meeting_score: 4,
    seating_score: 6,
    opening_hours: '07:00 - 20:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'outdoor'],
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
    created_at: '2026-08-08',
    updated_at: '2026-08-25',
  },
  {
    id: '9',
    name: 'Omah Kopi Dieng',
    slug: 'omah-kopi-dieng-banjarnegara',
    city: 'Banjarnegara',
    district: 'Banjarmangu',
    address: 'Jl. Raya Dieng No. 1, Banjarmangu, Banjarnegara',
    description: 'Coffee shop dengan pemandangan Gunung Dieng. Cocok untuk yang butuh inspirasi segar.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 7,
    outlet_score: 6,
    comfort_score: 8,
    noise_score: 9,
    meeting_score: 5,
    seating_score: 8,
    opening_hours: '08:00 - 20:00',
    featured: true,
    status: 'approved',
    amenities: ['wifi', 'outdoor', 'quiet', 'ac'],
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
    created_at: '2026-08-09',
    updated_at: '2026-08-25',
  },
  {
    id: '10',
    name: 'Kedai Kopi Bilingual',
    slug: 'kedai-kopi-bilingual-cilacap',
    city: 'Cilacap',
    district: 'Cilacap Selatan',
    address: 'Jl. Gatot Subroto No. 32, Cilacap',
    description: 'Coffee shop modern di jantung Cilacap.AC dingin dan WiFi stabil.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 8,
    outlet_score: 8,
    comfort_score: 8,
    noise_score: 6,
    meeting_score: 8,
    seating_score: 7,
    opening_hours: '10:00 - 22:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'ac', 'meeting'],
    image_url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
    created_at: '2026-08-10',
    updated_at: '2026-08-25',
  },
  {
    id: '11',
    name: 'Java Splash Coffee',
    slug: 'java-splash-coffee-cilacap',
    city: 'Cilacap',
    district: 'Cilacap Utara',
    address: 'Jl. Ahmad Yani No. 78, Cilacap',
    description: 'Coffee shop dengan nuansa vintage. Tempat asyik untuk workation.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 8,
    outlet_score: 7,
    comfort_score: 7,
    noise_score: 7,
    meeting_score: 6,
    seating_score: 7,
    opening_hours: '08:00 - 21:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'ac', 'quiet'],
    image_url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
    created_at: '2026-08-11',
    updated_at: '2026-08-25',
  },
  {
    id: '12',
    name: 'Kopi Kebumen',
    slug: 'kopi-kebumen-kebumen',
    city: 'Kebumen',
    district: 'Kebumen',
    address: 'Jl.veteran No. 15, Kebumen',
    description: 'Kedai kopi legendaris di Kebumen. Harga mahasiswa banget.',
    price_range: 'budget',
    price_label: '< Rp20K',
    wifi_score: 6,
    outlet_score: 5,
    comfort_score: 6,
    noise_score: 6,
    meeting_score: 3,
    seating_score: 5,
    opening_hours: '06:00 - 20:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'outdoor'],
    image_url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
    created_at: '2026-08-12',
    updated_at: '2026-08-25',
  },
  {
    id: '13',
    name: 'Seduh Kopi Kebumen',
    slug: 'seduh-kopi-kebumen',
    city: 'Kebumen',
    district: 'Kebumen',
    address: 'Jl. Pangandaran No. 8, Kebumen',
    description: 'Coffee shop minimalis dengan kopi single origin Kebumen. Tempat tenang untuk bekerja.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 8,
    outlet_score: 8,
    comfort_score: 8,
    noise_score: 8,
    meeting_score: 5,
    seating_score: 7,
    opening_hours: '09:00 - 21:00',
    featured: true,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'quiet', 'ac'],
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    created_at: '2026-08-13',
    updated_at: '2026-08-25',
  },
  {
    id: '14',
    name: 'Brewok Coffee House',
    slug: 'brewok-coffee-house-purwokerto',
    city: 'Banyumas',
    district: 'Purwokerto Timur',
    address: 'Jl. Suparto No. 5, Purwokerto',
    description: 'Coffee house dengan konsep modern. Roastery dan cafe dalam satu tempat.',
    price_range: 'premium',
    price_label: '> Rp40K',
    wifi_score: 9,
    outlet_score: 9,
    comfort_score: 9,
    noise_score: 8,
    meeting_score: 9,
    seating_score: 9,
    opening_hours: '07:00 - 23:00',
    featured: true,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'ac', 'meeting', 'quiet', 'parking'],
    image_url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800',
    created_at: '2026-08-14',
    updated_at: '2026-08-25',
  },
  {
    id: '15',
    name: 'Tuku Kopi Cilacap',
    slug: 'tuku-kopi-cilacap',
    city: 'Cilacap',
    district: 'Cilacap Barat',
    address: 'Jl. Sungai Lukito No. 12, Cilacap',
    description: 'Coffee shop baru dengan suasana cozy. Tempat favorit freelance designers.',
    price_range: 'moderate',
    price_label: 'Rp20K–40K',
    wifi_score: 9,
    outlet_score: 8,
    comfort_score: 9,
    noise_score: 7,
    meeting_score: 7,
    seating_score: 8,
    opening_hours: '10:00 - 22:00',
    featured: false,
    status: 'approved',
    amenities: ['wifi', 'outlet', 'ac', 'meeting'],
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    created_at: '2026-08-15',
    updated_at: '2026-08-25',
  },
];

// Calculate founder scores and add to shops
export const coffeeShops: CoffeeShop[] = rawShops.map((shop) => ({
  ...shop,
  founder_score: calculateFounderScore(shop),
}));

// Get shop by slug
export function getCoffeeShopBySlug(slug: string): CoffeeShop | undefined {
  return coffeeShops.find((shop) => shop.slug === slug);
}

// Get shops by city
export function getCoffeeShopsByCity(city: string): CoffeeShop[] {
  return coffeeShops.filter((shop) => shop.city.toLowerCase() === city.toLowerCase());
}

// Get featured shops
export function getFeaturedShops(): CoffeeShop[] {
  return coffeeShops.filter((shop) => shop.featured);
}

// Get all cities
export function getCities(): string[] {
  return ['Banyumas', 'Purbalingga', 'Banjarnegara', 'Cilacap', 'Kebumen'];
}

// Filter shops
export function filterShops(filters: {
  city?: string;
  wifi?: boolean;
  outlet?: boolean;
  quiet?: boolean;
  meeting?: boolean;
  search?: string;
  budget?: string;
}): CoffeeShop[] {
  return coffeeShops.filter((shop) => {
    if (filters.city && shop.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    if (filters.wifi && !shop.amenities.includes('wifi')) {
      return false;
    }
    if (filters.outlet && !shop.amenities.includes('outlet')) {
      return false;
    }
    if (filters.quiet && !shop.amenities.includes('quiet')) {
      return false;
    }
    if (filters.meeting && !shop.amenities.includes('meeting')) {
      return false;
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (
        !shop.name.toLowerCase().includes(search) &&
        !shop.description.toLowerCase().includes(search) &&
        !shop.city.toLowerCase().includes(search)
      ) {
        return false;
      }
    }
    if (filters.budget) {
      if (filters.budget === 'budget' && shop.price_range !== 'budget') return false;
      if (filters.budget === 'moderate' && shop.price_range !== 'moderate') return false;
      if (filters.budget === 'premium' && shop.price_range !== 'premium') return false;
    }
    return true;
  });
}
