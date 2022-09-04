/* eslint-disable */
export const linkValid = (link: string): boolean => {
  return (
    !!link.match(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    ) && !link.includes(' ')
  );
};

export const aliasValid = (alias: string): boolean => {
  return (
    !!alias.match(/^[a-zA-Z0-9]+$/) &&
    alias.length >= 5 &&
    !alias.includes(' ')
  );
};
