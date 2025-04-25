import { hc } from 'hono/client';
import { Apptype } from '@/app/api/[[...route]]/route';

export const client = hc<Apptype>(process.env.NEXT_PUBLIC_APP_URL!);
