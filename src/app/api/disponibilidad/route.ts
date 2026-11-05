import { NextResponse } from 'next/server';
import { getServicio } from '@/content/servicios';
import { huecosDisponibles } from '@/lib/disponibilidad';
import { esFecha } from '@/lib/tiempo';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const servicio = getServicio(searchParams.get('servicio') ?? '');
  const fecha = searchParams.get('fecha');
  if (!servicio || !esFecha(fecha)) return NextResponse.json({ error: 'Parámetros no válidos' }, { status: 400 });
  try {
    return NextResponse.json({ huecos: await huecosDisponibles(servicio, fecha) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'No se pudo consultar la agenda' }, { status: 500 });
  }
}
