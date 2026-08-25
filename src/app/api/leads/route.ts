import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      include: {
        coffeeShop: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform to match frontend Lead type
    const transformedLeads = leads.map((lead) => ({
      id: lead.id,
      coffee_shop_id: lead.coffeeShopId,
      coffee_shop_name: lead.coffeeShop?.name,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      intent: lead.intent,
      message: lead.message,
      status: lead.status,
      created_at: lead.createdAt.toISOString(),
    }));

    return NextResponse.json(transformedLeads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { coffee_shop_id, name, email, phone, intent, message } = body;

    if (!name || !email || !intent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        coffeeShopId: coffee_shop_id,
        name,
        email,
        phone,
        intent,
        message,
        status: 'new',
      },
    });

    return NextResponse.json({
      id: lead.id,
      coffee_shop_id: lead.coffeeShopId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      intent: lead.intent,
      message: lead.message,
      status: lead.status,
      created_at: lead.createdAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      id: lead.id,
      status: lead.status,
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
