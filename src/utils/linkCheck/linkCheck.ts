const linkCheck = (link: string): boolean | RegExpMatchArray => {
  return (
    link.match(
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
    ) || !link.includes(' ')
  );
};

export default linkCheck;
