import { INVALID_LINKS } from '@/components/constants';

/* eslint-disable */
export const linkAccepted = (link: string): boolean => {
  const match = link.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/i);
  const hostname = match && match[1];

  return !INVALID_LINKS.includes(
    hostname?.replace('www.', '') ||
      (process.env.NEXT_PUBLIC_DOMAIN as string) ||
      ''
  );
};

export const linkValid = (link: string): boolean => {
  return (
    !!link
      .trim()
      .match(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
      ) &&
    !link.trim().includes(' ') &&
    !link.trim().includes(process.env.NEXT_PUBLIC_DOMAIN as string)
  );
};

export const aliasValid = (alias: string): boolean => {
  return (
    !!alias.match(/^[a-zA-Z0-9]+$/) &&
    alias.length >= 5 &&
    !alias.includes(' ')
  );
};
