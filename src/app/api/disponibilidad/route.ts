import { NextResponse } from 'next/server';
import { esRegion } from '@/config/agenda';
import { getServicio } from '@/content/servicios';
import { diasDisponibles, huecosDisponibles } from '@/lib/disponibilidad';
import { esFecha } from '@/lib/tiempo';

export const dynamic = 'force-dynamic';

/**
 * GET ?servicio=&region=&zona=&fecha=AAAA-MM-DD → huecos libres de ese día.
 * GET ?servicio=&region=&zona=&dias=1          → días del calendario con algún hueco.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const servicio = getServicio(searchParams.get('servicio') ?? '');
  const region = searchParams.get('region') ?? 'europa';
  const zona = searchParams.get('zona');
  const fecha = searchParams.get('fecha');
  const pideDias = searchParams.get('dias') === '1';
  if (!servicio || !esRegion(region) || (!pideDias && !esFecha(fecha))) {
    return NextResponse.json({ error: 'Parámetros no válidos' }, { status: 400 });
  }
  try {
    if (pideDias) return NextResponse.json({ dias: await diasDisponibles(servicio, region, zona) });
    return NextResponse.json({ huecos: await huecosDisponibles(servicio, fecha!, region, zona) });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'No se pudo consultar la agenda' }, { status: 500 });
  }
}
