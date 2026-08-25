import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      city,
      address,
      google_maps_url,
      instagram_url,
      phone,
      opening_hours,
      price_range,
      wifi,
      outlet,
      meeting,
      quiet,
      outdoor,
      ac,
      description,
    } = body;

    if (!name || !city || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const submission = await prisma.submission.create({
      data: {
        name,
        city,
        address,
        googleMapsUrl: google_maps_url,
        instagramUrl: instagram_url,
        phone,
        openingHours: opening_hours,
        priceRange: price_range,
        wifi: wifi || false,
        outlet: outlet || false,
        meeting: meeting || false,
        quiet: quiet || false,
        outdoor: outdoor || false,
        ac: ac || false,
        description,
        status: 'pending',
      },
    });

    return NextResponse.json({
      id: submission.id,
      name: submission.name,
      status: submission.status,
      message: 'Submission received and pending review',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};
    if (status) {
      where.status = status;
    }

    const submissions = await prisma.submission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
