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
  hidden: boolean
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'fr'; 

  try {
    const services = await db.service.findMany();

    const translatedServices = services.map((service: Service) => {
      const title = service[`title_${locale}` as keyof Service] || service.title_en; 
      const description = service[`description_${locale}` as keyof Service] || service.description_en;

      return {
        id: service.id,
        banner: service.banner,
        pricePerHour: service.pricePerHour,
        category: service.category,
        title,
        description,
        hidden: service.hidden
      };
    });

    return NextResponse.json(translatedServices);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
    }, { status: 500 });
  }
}
