import { linkAccepted, linkValid } from '@/utils/regEx';
import { object, z } from 'zod';

export const createShortURLSchema = object({
  link: z
    .string({
      required_error: 'Link is required',
    })
    .min(1, 'Invalid link'),
  user: z.string().optional(),
  alias: z
    .string()
    .min(5, 'Alias must be 5 alphanumeric characters')
    .optional(),
})
  .refine((data) => linkValid(data.link), {
    message: 'Invalid link',
    path: ['link'],
  })
  .refine((data) => linkAccepted(data.link), {
    message: "We're sorry but we don't accept links from this domain",
    path: ['link'],
  });
