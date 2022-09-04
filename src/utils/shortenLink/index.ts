import { CreateShortURLInput } from '@/types/url';
import fetcher from '../fetcher';

const shortenLink = async (values: CreateShortURLInput) => {
  const data = await fetcher('/urls', 'POST', values);
  return data;
};

export default shortenLink;
