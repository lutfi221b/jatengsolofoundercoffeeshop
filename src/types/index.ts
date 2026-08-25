// Types for jatengsolofoundercoffee

export interface CoffeeShop {
  id: string;
  name: string;
  slug: string;
  city: 'Banyumas' | 'Purbalingga' | 'Banjarnegara' | 'Cilacap' | 'Kebumen';
  district: string;
  address: string;
  latitude?: number;
  longitude?: number;
  google_maps_url?: string;
  instagram_url?: string;
  phone?: string;
  description: string;
  price_range: 'budget' | 'moderate' | 'premium';
  price_label: string;
  wifi_score: number;
  outlet_score: number;
  comfort_score: number;
  noise_score: number;
  meeting_score: number;
  seating_score: number;
  opening_hours: string;
  founder_score: number;
  featured: boolean;
  status: 'approved' | 'pending' | 'rejected';
  amenities: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  coffee_shop_id: string;
  coffee_shop_name?: string;
  name: string;
  email: string;
  phone?: string;
  intent: 'work_space' | 'meeting' | 'event' | 'community_meetup' | 'collaboration' | 'other';
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  created_at: string;
}

export interface FilterState {
  city?: string;
  wifi?: boolean;
  outlet?: boolean;
  quiet?: boolean;
  meeting?: boolean;
  outdoor?: boolean;
  ac?: boolean;
  smoking?: boolean;
  budget?: string;
  search?: string;
}
