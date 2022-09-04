import { TypeOf } from 'zod';

import { createUserSchema, loginUserSchema } from '@/schema/user';

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;

export interface UserDocument {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: false;
  createdAt: Date | string;
  updatedAt: Date | string;
}
