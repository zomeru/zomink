import { linkValid } from '@/utils/regEx';
import { object, z } from 'zod';

export const createShortURLSchema = object({
  link: z
    .string({
      required_error: 'Link is required',
    })
    .min(1, 'Invalid link'),
  user: z.string().optional(),
  alias: z.string().optional(),
}).refine((data) => linkValid(data.link), {
  message: 'Invalid link',
  path: ['link'],
});
