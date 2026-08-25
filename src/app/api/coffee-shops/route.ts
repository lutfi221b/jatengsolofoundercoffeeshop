import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {
      status: 'approved',
    };

    if (city) {
      where.city = city;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    const coffeeShops = await prisma.coffeeShop.findMany({
      where,
      orderBy: { founderScore: 'desc' },
    });

    return NextResponse.json(coffeeShops);
  } catch (error) {
    console.error('Error fetching coffee shops:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
