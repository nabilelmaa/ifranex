import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface Service {
    id: string;
    banner: string;
    pricePerHour: number;
    category: string;
    title_en: string;
    description_en: string;
    title_fr: string;
    description_fr: string;
  }
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr';

  try {
    const service = await db.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    const title = service[`title_${locale}` as keyof Service] || service.title_en;
    const description = service[`description_${locale}` as keyof Service] || service.description_en;

    const translatedService = {
      id: service.id,
      banner: service.banner,
      pricePerHour: service.pricePerHour,
      category: service.category,
      title,
      description,
    };

    return NextResponse.json(translatedService);
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
    }, { status: 500 });
  }
}
