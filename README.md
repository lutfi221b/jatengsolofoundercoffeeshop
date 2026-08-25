# Semarang Solo Founder Coffee

Coffee shop directory untuk solo founder dan solopreneur di Barlingmascakeb, Jawa Tengah.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL via SumoPod
- **ORM**: Prisma 6
- **Analytics**: Cloudflare Web Analytics (free)
- **Styling**: Tailwind CSS + Airbnb-inspired design system
- **Deployment**: Vercel

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup database

Buat PostgreSQL database di SumoPod, lalu copy connection string ke `.env`:

```bash
cp .env.example .env
# Edit .env dan masukkan DATABASE_URL dari SumoPod
```

### 3. Setup database schema

```bash
# Generate Prisma Client
npm run db:generate

# Push schema ke database
npm run db:push

# Seed initial data
npm run db:seed
```

### 4. Run development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Deployment ke Vercel

### 1. Push code ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create jateng-solofoundercoffee --public --push
```

### 2. Setup SumoPod PostgreSQL

1. Buat akun di [SumoPod](https://sumopod.com)
2. Buat database baru
3. Copy connection string

### 3. Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

### 4. Set Environment Variables di Vercel Dashboard

Tambah variabel `DATABASE_URL` dengan value dari SumoPod.

### 5. Redeploy

Setelah environment variable diset, redeploy dari Vercel dashboard atau:

```bash
vercel --prod
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## Pages

- `/` - Landing page
- `/coffee` - Coffee shop directory
- `/coffee/[slug]` - Coffee shop detail
- `/submit` - Submit new coffee shop
- `/admin` - Admin dashboard (leads management)

## API Routes

- `GET /api/coffee-shops` - List all coffee shops
- `GET /api/coffee-shops/[slug]` - Get coffee shop by slug
- `POST /api/leads` - Create new lead
- `GET /api/leads` - List all leads
- `PATCH /api/leads` - Update lead status
- `POST /api/submit` - Submit new coffee shop

## Database Schema

### CoffeeShop

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| name | String | Coffee shop name |
| slug | String | URL-friendly name |
| city | String | City in Barlingmascakeb |
| district | String | District/area |
| address | String | Full address |
| description | String | About the place |
| founderScore | Float | Calculated founder-friendliness score |
| wifiScore | Int | WiFi quality (1-10) |
| outletScore | Int | Power outlets (1-10) |
| comfortScore | Int | Work comfort (1-10) |
| noiseScore | Int | Noise level (1-10) |
| meetingScore | Int | Meeting suitability (1-10) |
| seatingScore | Int | Seating quality (1-10) |
| priceRange | String | budget/moderate/premium |
| priceLabel | String | Display price range |
| openingHours | String | Operating hours |
| amenities | String[] | List of amenities |
| featured | Boolean | Featured listing |
| status | String | approved/pending/rejected |

### Lead

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| coffeeShopId | String | Related coffee shop |
| name | String | Lead name |
| email | String | Lead email |
| phone | String | Lead phone |
| intent | String | work_space/meeting/event/etc |
| message | String | Additional message |
| status | String | new/contacted/qualified/converted/closed |

### Submission

| Field | Type | Description |
|-------|------|-------------|
| id | String | Unique identifier |
| name | String | Coffee shop name |
| city | String | City |
| address | String | Full address |
| status | String | pending/approved/rejected |

## Founder Score Formula

```
Founder Score =
  WiFi × 20%
+ Power Outlet × 15%
+ Work Comfort × 20%
+ Noise Level × 15%
+ Meeting Friendly × 10%
+ Seating × 10%
+ Opening Hours × 10%
```

## Analytics

Menggunakan **Cloudflare Web Analytics** - 100% free, privacy-friendly, no cookies.

### Setup

1. Daftar domain di [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)
2. Copy your analytics token
3. Set `NEXT_PUBLIC_CLOUDFLARE_TOKEN` environment variable
4. Update the token in `src/app/layout.tsx`

### Events yang Dilacak

| Event | Trigger |
|-------|---------|
| `lead_form_opened` | User klik "Ask Coffee Shop" |
| `lead_form_submitted` | User submit lead form |
| `directions_clicked` | User klik Google Maps |
| `instagram_clicked` | User klik Instagram link |
| `phone_clicked` | User klik phone number |
| `submission_submitted` | User submit coffee shop baru |
| `filter_cleared` | User clear filters |
| `search_performed` | User search (3+ chars) |

### Custom Events

```typescript
import { track, AnalyticsEvents } from '@/lib/analytics';

// Basic
track(AnalyticsEvents.LEAD_FORM_SUBMIT);

// With properties
track(AnalyticsEvents.COFFEE_SHOP_VIEW, {
  coffee_shop: 'Kopi Joss',
  city: 'Banyumas'
});
```

## Geographic Scope

MVP fokus pada **Barlingmascakeb**:
- Banjarnegara
- Purbalingga
- Banyumas
- Cilacap
- Kebumen
