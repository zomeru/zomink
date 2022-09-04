import { URLDocument } from '../url';
import { UserDocument } from '../user';

export interface ResponseDocument {
  status: 'error' | 'success';
  statusCode: number;
  data?: {
    user?: UserDocument;
    message?: string;
    urlData?: URLDocument | Array<URLDocument>;
  };
  message?: string;
}
