import { createShortURLSchema } from '@/schema/url';
import { TypeOf } from 'zod';

export type CreateShortURLInput = TypeOf<typeof createShortURLSchema>;

export interface URLDocument {
  _id: string;
  link: string;
  alias: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  user?: string;
}
