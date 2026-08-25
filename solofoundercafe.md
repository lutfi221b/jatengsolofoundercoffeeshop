# Jateng Solo Founder Coffee

> **Working SaaS name:** `jatengsolofoundercoffee`  
> **Product concept:** Coffee-shop directory + lead generation untuk solo founder / solopreneur di Barlingmascakeb, Jawa Tengah.  
> **MVP philosophy:** Ship fast, free first, validate demand before building complex SaaS features.

---

## 1. One-Liner

**Jateng Solo Founder Coffee** adalah directory coffee shop di wilayah **Barlingmascakeb, Jawa Tengah** yang dikurasi untuk **solo founder, solopreneur, freelancer, remote worker, dan builder**, dengan fitur utama untuk menemukan tempat yang cocok bekerja sekaligus menghasilkan **leads** bagi coffee shop.

Inspirasi konsep:

- Nomads-style location discovery
- Pieter Levels-style bootstrapped SaaS
- Local niche directory
- Community-driven data
- Lead generation
- Manual-first MVP

---

# 2. Problem

Solo founder / solopreneur yang bekerja dari coffee shop biasanya mencari:

- WiFi yang stabil
- colokan
- tempat duduk nyaman
- suasana tenang
- cocok untuk meeting
- buka cukup lama
- tidak terlalu ramai
- affordable
- bisa kerja 2–4 jam
- lokasi yang mudah diakses

Masalahnya:

> Google Maps memiliki terlalu banyak pilihan, tetapi tidak mengoptimalkan pencarian untuk kebutuhan **"tempat kerja yang cocok untuk solo founder."**

Di sisi lain, coffee shop lokal:

- ingin mendapatkan customer baru
- ingin dikenal sebagai tempat kerja / meeting
- ingin mendapatkan komunitas freelancer dan founder
- belum tentu punya cara sederhana untuk mendapatkan leads

---

# 3. Target Market

## Primary User

### Solo Founder

Orang yang:

- membangun startup sendiri
- menjalankan SaaS
- indie hacker
- developer
- designer
- agency owner
- creator
- freelancer
- consultant

## Secondary User

- Remote worker
- Digital nomad
- mahasiswa tingkat akhir
- UMKM owner
- content creator
- komunitas startup
- pekerja hybrid

## B2B Customer Potential

Coffee shop yang ingin:

- mendapatkan customer
- mendapatkan booking meeting
- mendapatkan event
- mendapatkan exposure
- menjangkau komunitas founder

---

# 4. Geographic Scope

MVP fokus pada:

## Barlingmascakeb

- Banjarnegara
- Purbalingga
- Banyumas
- Cilacap
- Kebumen

Jangan langsung memperluas ke seluruh Jawa Tengah.

### Prinsip

> Own one small geographic niche first.

Jika MVP berhasil, baru expand:

```text
Barlingmascakeb
      ↓
Jawa Tengah
      ↓
Indonesia
```

---

# 5. Product Positioning

### Untuk user

> "Cari coffee shop terbaik buat kerja, ngoding, meeting, dan membangun bisnis di Barlingmascakeb."

### Untuk coffee shop

> "Dapatkan customer dari komunitas solo founder dan solopreneur lokal."

### Short tagline

**Find. Work. Build.**

Alternatif:

**Coffee shops for people building things.**

---

# 6. MVP Scope

Jangan membuat terlalu banyak fitur.

MVP cukup memiliki:

1. Coffee shop directory
2. Search
3. Filter
4. Coffee shop detail page
5. Founder-friendly scoring
6. Lead CTA
7. Submit coffee shop
8. Simple admin
9. Analytics dasar

---

# 7. Core User Flow

```text
Landing Page
     ↓
Choose Location
     ↓
Coffee Shop List
     ↓
Filter
     ↓
Coffee Shop Detail
     ↓
"Get Directions"
"Contact"
"Book / Ask"
     ↓
Lead generated
```

---

# 8. Homepage

Hero:

> ## Coffee shops for solo founders in Barlingmascakeb.

Subheadline:

> Temukan tempat ngopi yang enak buat kerja, ngoding, meeting, dan membangun bisnis.

CTA:

- `Explore Coffee Shops`
- `Add Your Coffee Shop`

---

# 9. Coffee Shop Card

Setiap coffee shop ditampilkan sebagai card.

Contoh:

```text
┌─────────────────────────────┐
│ 📷 Coffee Shop Image        │
│                             │
│ Kopi Example                │
│ Purwokerto                 │
│                             │
│ ⭐ Founder Friendly: 8.7    │
│                             │
│ ✓ Fast WiFi                │
│ ✓ Banyak Colokan           │
│ ✓ Meeting Friendly         │
│ ✓ Quiet                    │
│                             │
│ Rp20K–40K                  │
│                             │
│ [View Place]               │
└─────────────────────────────┘
```

---

# 10. Founder-Friendly Score

Buat scoring sederhana.

## Score 0–10

Komponen:

| Faktor | Bobot |
|---|---:|
| WiFi | 20% |
| Colokan | 15% |
| Kenyamanan kerja | 20% |
| Noise level | 15% |
| Meeting friendly | 10% |
| Seating | 10% |
| Opening hours | 10% |

Formula:

```text
Founder Score =
WiFi × 20%
+ Power Outlet × 15%
+ Work Comfort × 20%
+ Noise × 15%
+ Meeting Friendly × 10%
+ Seating × 10%
+ Opening Hours × 10%
```

Tidak perlu AI pada MVP.

Manual scoring lebih cepat.

---

# 11. Filter

MVP filter:

### Location

- Banyumas
- Purbalingga
- Banjarnegara
- Cilacap
- Kebumen

### Work Friendly

- WiFi
- Colokan
- Quiet
- Meeting
- Outdoor
- AC
- Smoking area

### Budget

- < Rp20K
- Rp20K–40K
- Rp40K–60K
- > Rp60K

### Opening Hours

- Early morning
- Daytime
- Evening
- Late night

---

# 12. Coffee Shop Detail Page

URL:

```text
/coffee/[slug]
```

Contoh:

```text
/coffee/kopi-example-purwokerto
```

Isi:

- Foto
- Nama
- Lokasi
- Google Maps
- Opening hours
- Price range
- Founder Score
- WiFi score
- Power outlet
- Noise level
- Seating
- Meeting suitability
- Description
- Amenities
- User reviews
- CTA lead

---

# 13. Lead Feature

Ini fitur yang membedakan produk dari directory biasa.

## User CTA

Pada halaman coffee shop:

```text
Interested in this place?

[Ask Coffee Shop]
[Book a Meeting]
[Get Directions]
```

Untuk MVP, lead tidak perlu kompleks.

User mengisi:

```text
Name
Email / WhatsApp
Coffee shop
What do you need?

[ ] Work space
[ ] Meeting
[ ] Event
[ ] Community meetup
[ ] Collaboration
[ ] Other

Message
```

Submit.

---

# 14. Lead Object

Database:

```text
Lead

id
coffee_shop_id
name
email
phone
intent
message
status
created_at
```

Status:

```text
new
contacted
qualified
converted
closed
```

---

# 15. Lead Dashboard

Admin dashboard sederhana.

```text
LEADS

New Leads       12
Contacted        8
Qualified        4
Converted        2
```

Table:

```text
Name
Coffee Shop
Intent
Date
Status
Action
```

MVP tidak perlu dashboard coffee shop terpisah.

Admin bisa meneruskan lead secara manual.

---

# 16. Lead Monetization — Future

Jangan monetize terlalu cepat.

### Phase 1

Free.

Tujuan:

> prove people use it.

### Phase 2

Coffee shop premium:

```text
Rp49K–99K / month
```

Benefit:

- Featured listing
- Higher ranking
- More photos
- Special badge
- Analytics
- Lead notifications
- Event promotion

### Phase 3

Pay per lead:

```text
Rp5K–20K / qualified lead
```

### Phase 4

Sponsored placement.

---

# 17. Coffee Shop Submission

CTA:

> **Punya coffee shop favorit yang belum ada?**

Form:

```text
Coffee Shop Name
City
Address
Google Maps URL
Instagram
Phone
Opening Hours
Price Range
WiFi?
Power Outlet?
Meeting Friendly?
Quiet?
Description
Photos
```

Untuk MVP:

> Semua submission masuk moderation queue.

---

# 18. Admin

Admin harus bisa:

- Add coffee shop
- Edit coffee shop
- Delete coffee shop
- Approve submission
- Reject submission
- Manage score
- View leads
- Update lead status
- Feature coffee shop

Tidak perlu role management kompleks.

---

# 19. Data Model

Minimal:

```text
CoffeeShop
-----------
id
name
slug
city
district
address
latitude
longitude
google_maps_url
instagram_url
phone
description
price_range
wifi_score
outlet_score
comfort_score
noise_score
meeting_score
seating_score
opening_hours
founder_score
featured
status
created_at
updated_at
```

Amenities:

```text
Amenity
-----------
id
coffee_shop_id
name
```

Lead:

```text
Lead
-----------
id
coffee_shop_id
name
email
phone
intent
message
status
created_at
```

---

# 20. Suggested Tech Stack

Gunakan stack yang cepat dikerjakan.

## Option A — Simple SaaS

```text
Next.js
TypeScript
Tailwind CSS
SumoPod PostgreSQL
Vercel
```

Database:

```text
PostgreSQL via Sumopod
```

Authentication:

```text
Auth.js
```

Analytics:

```text
Plausible
```

atau analytics sederhana terlebih dahulu.

---

# 21. SEO

SEO sangat penting untuk directory.

Generate halaman:

```text
/coffee
/coffee/purwokerto
/coffee/purbalingga
/coffee/banjarnegara
/coffee/cilacap
/coffee/kebumen
```

Contoh SEO page:

> Coffee Shop untuk Kerja di Purwokerto

> Coffee Shop dengan WiFi di Banyumas

> Tempat Ngoding di Purwokerto

> Coffee Shop untuk Meeting di Purbalingga

> Coffee Shop Founder Friendly di Barlingmascakeb

---

# 22. Local SEO

Setiap coffee shop memiliki:

```text
Name
Address
City
Opening hours
Phone
Geo coordinates
```

Gunakan structured data:

```text
LocalBusiness
CafeOrCoffeeShop
```

Tujuan:

> mendapatkan traffic dari Google Search, bukan hanya social media.

---

# 23. Discovery Strategy

Jangan menunggu coffee shop submit sendiri.

Founder melakukan:

```text
Google Maps
Instagram
TikTok
Local communities
Facebook groups
WhatsApp communities
```

Cari coffee shop secara manual.

MVP awal:

> 50–100 coffee shops cukup.

Target:

```text
Banyumas       25
Purbalingga    20
Cilacap        15
Kebumen        15
Banjarnegara   15

Total          ~90
```

Tidak perlu menunggu 1.000 listing.

---

# 24. Initial Curation

Setiap coffee shop diberi:

```text
Founder Score
WiFi
Outlet
Noise
Seating
Meeting
Price
Opening Hours
```

Gunakan data publik dan verifikasi manual.

Jangan mengklaim kualitas yang belum diverifikasi.

Tambahkan:

```text
Last verified:
August 2026
```

---

# 25. Viral Loop

Pada detail coffee shop:

```text
☕ Found a great place to work?

Share this coffee shop
```

Share URL:

```text
jatengsolofoundercoffee.com/coffee/xxx
```

User dapat mengirim coffee shop baru:

```text
"Know a better coffee shop?"
```

---

# 26. Community Loop

Buat konsep:

> **Founder Coffee Spot of the Week**

Setiap minggu pilih 1 coffee shop.

Post ke:

- Instagram
- LinkedIn
- X
- komunitas lokal

Format:

```text
☕ Founder Coffee Spot of the Week

This week's pick:

[Coffee Shop]

📍 Purwokerto
⚡ WiFi: 9/10
🔌 Outlet: 8/10
🤫 Noise: 8/10

Perfect for:
Building your next SaaS.

[View on Jateng Solo Founder Coffee]
```

---

# 27. MVP Metrics

Jangan terlalu banyak KPI.

Track:

## Acquisition

```text
Visitors
Organic visitors
Search visitors
Social visitors
```

## Activation

```text
Coffee shop detail views
Map clicks
Lead form opens
Lead submissions
```

## Supply

```text
Total coffee shops
Approved coffee shops
New submissions
```

## Business

```text
Total leads
Qualified leads
Converted leads
```

North Star Metric:

> **Qualified coffee-shop leads generated per month.**

---

# 28. MVP Success Criteria

MVP dianggap validated jika dalam 30–60 hari:

```text
100+ coffee shops
500+ unique visitors
100+ coffee shop detail views
20+ leads
10+ coffee shop submissions
```

Strong validation:

```text
Coffee shop owner asks:

"How can I get more leads?"
```

Very strong validation:

```text
Coffee shop owner is willing to pay.
```

---

# 29. What NOT To Build

Jangan membangun:

- Mobile app
- Native iOS
- Native Android
- Complex recommendation AI
- Chat system
- Coffee shop dashboard
- Subscription billing
- Loyalty points
- Social network
- Complex review system
- Advanced maps
- Real-time WiFi monitoring
- AI chatbot

Semua itu nanti.

---

# 30. 7-Day MVP Sprint

## Day 1

```text
Project setup
Database
Landing page
```

## Day 2

```text
Coffee shop database
Directory page
Coffee shop cards
```

## Day 3

```text
Detail page
Filters
Search
```

## Day 4

```text
Lead form
Lead database
Admin lead page
```

## Day 5

```text
Submission form
Admin CRUD
SEO
```

## Day 6

```text
Seed 50–100 coffee shops
Fix UX
Mobile responsive
```

## Day 7

```text
Deploy
Analytics
Launch
```

---

# 31. Landing Page Copy

## Hero

> # Coffee shops for people building things.

> Temukan coffee shop yang cocok buat kerja, ngoding, meeting, dan membangun bisnis di Barlingmascakeb.

CTA:

```text
Explore Coffee Shops →
```

Secondary:

```text
Add a Coffee Shop
```

---

## Section

### Built for Solo Founders

> Bukan sekadar coffee shop directory. Kami membantu kamu menemukan tempat yang cocok untuk fokus, meeting, dan membangun sesuatu.

---

## Filters

```text
⚡ Fast WiFi
🔌 Power Outlet
🤫 Quiet
👥 Meeting Friendly
❄️ AC
🌙 Open Late
```

---

# 32. Brand Direction

Nama produk:

# Jateng Solo Founder Coffee

Domain/brand shorthand:

```text
JatengSoloFounderCoffee
```

Internal/project slug:

```text
jatengsolofoundercoffee
```

Positioning:

```text
Local
Founder-focused
Indie
Community-driven
Useful
Simple
```

Visual style:

- Minimal
- Editorial
- Coffee-inspired
- Banyak whitespace
- Typography kuat
- Tidak terlihat seperti corporate SaaS

---

# 33. Pieter Levels Principle

Produk ini harus mengikuti prinsip:

> **Don't build what you haven't validated.**

Urutannya:

```text
Manual research
       ↓
Directory
       ↓
Traffic
       ↓
Lead generation
       ↓
Coffee shop demand
       ↓
Monetization
       ↓
Automation
```

Bukan:

```text
Build SaaS
↓
Build dashboard
↓
Build billing
↓
Build AI
↓
Search for customers
```

---

# 34. Future SaaS Roadmap

## V0

Free directory.

```text
Coffee shops
+
Founder score
+
Filters
```

## V0.1

Lead generation.

```text
Coffee shop
↓
User inquiry
↓
Lead
```

## V0.2

Coffee shop claim profile.

```text
Claim this listing
```

## V0.3

Owner dashboard.

```text
Views
Clicks
Leads
```

## V0.4

Premium listing.

```text
Featured
Sponsored
```

## V1

Founder membership/community.

```text
Founder profiles
Events
Meetups
Coffee sessions
```

## V2

Expand geography.

```text
Barlingmascakeb
↓
Jawa Tengah
↓
Indonesia
```

---

# 35. Potential Long-Term Product

Jika validasi berhasil, produk dapat berkembang dari:

```text
Coffee Shop Directory
```

menjadi:

```text
Local Founder Network
```

yang menghubungkan:

```text
Solo Founder
      ↕
Coffee Shop
      ↕
Community
      ↕
Event
      ↕
Business Lead
```

Potential features:

- Founder meetups
- Coffee shop events
- Coworking discovery
- Founder profiles
- Local startup directory
- Community events
- Founder-friendly venues
- Business networking
- Sponsored events
- Local SaaS ecosystem

---

# 36. Most Important MVP Rule

**Jangan mulai dari SaaS. Mulai dari directory.**

Target pertama bukan:

> "Berapa banyak user yang signup?"

Target pertama:

> "Apakah orang benar-benar mencari coffee shop yang founder-friendly?"

Target kedua:

> "Apakah coffee shop mendapatkan value dari leads?"

Kalau dua pertanyaan tersebut terbukti, barulah `jatengsolofoundercoffee` berubah dari directory menjadi SaaS.

---

# 37. Definition of Done

MVP siap launch ketika:

- [ ] Landing page live
- [ ] 50+ coffee shops tersedia
- [ ] Semua coffee shop memiliki detail page
- [ ] Search berfungsi
- [ ] Filter berfungsi
- [ ] Founder Score tampil
- [ ] Google Maps link tersedia
- [ ] Lead form berfungsi
- [ ] Lead tersimpan di database
- [ ] Admin bisa melihat leads
- [ ] Coffee shop submission berfungsi
- [ ] Mobile responsive
- [ ] SEO metadata tersedia
- [ ] Analytics aktif
- [ ] Domain live

---

# 38. Launch Strategy

Jangan launch dengan:

> "Kami baru membuat SaaS."

Launch dengan:

> **"Kami bikin daftar coffee shop terbaik buat solo founder di Barlingmascakeb."**

Post pertama:

```text
☕ Baru bikin:

Jateng Solo Founder Coffee

Directory coffee shop di Barlingmascakeb
yang cocok buat:

→ ngoding
→ kerja
→ meeting
→ bikin SaaS
→ ketemu sesama founder

Saat ini sudah ada 50+ tempat.

Kalau kamu punya hidden gem,
submit di sini.

Free.
```

---

# 39. Final Product Thesis

> **Jateng Solo Founder Coffee dimulai sebagai free local directory, bukan sebagai SaaS kompleks.**

Moat awal bukan teknologi.

Moat awal adalah:

```text
Curated data
+
Local knowledge
+
Founder community
+
SEO
+
Coffee shop relationships
+
Lead data
```

Teknologi dibuat sesederhana mungkin sampai ada bukti bahwa market menginginkannya.

**Build small. Launch fast. Talk to users. Charge later.**
