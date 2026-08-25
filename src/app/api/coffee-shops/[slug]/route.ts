import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const coffeeShop = await prisma.coffeeShop.findUnique({
      where: { slug },
      include: {
        leads: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!coffeeShop) {
      return NextResponse.json({ error: 'Coffee shop not found' }, { status: 404 });
    }

    return NextResponse.json(coffeeShop);
  } catch (error) {
    console.error('Error fetching coffee shop:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
