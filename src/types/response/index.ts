import { UserDocument } from '../user';

export interface ResponseDocument {
  status: 'error' | 'success';
  statusCode: number;
  data?: {
    user: UserDocument;
    message?: string;
  };
  message?: string;
}
