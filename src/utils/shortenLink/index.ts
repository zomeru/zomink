import type { CreateShortURLInput } from '@/types/url';
import fetcher from '../fetcher';

export const removeForwardSlash = (link: string) => {
  let newLink = `${link}`;
  while (newLink.charAt(newLink.length - 1) === '/') {
    newLink = newLink.substr(0, newLink.length - 1);
  }

  return newLink;
};

const shortenLink = async (values: CreateShortURLInput) => {
  const data = await fetcher('/urls', 'POST', values);
  return data;
};

export default shortenLink;
