import React from 'react';

const TextError = <T,>({
  showError,
  errorText,
  className,
  dotClassName,
}: {
  showError: T;
  errorText: string;
  className?: string;
  dotClassName?: string;
}) => {
  return (
    <div
      className={`mx-auto flex w-full justify-center space-x-3 ${
        showError ? 'h-[10px]' : 'hidden h-[0px]'
      } ${className}`}
    >
      <p
        className={`-translate-y-[10px] animate-pulse text-4xl text-red-600 ${
          showError ? 'opacity-1 h-[10px]' : 'hidden h-[0px] opacity-0'
        } ${dotClassName}`}
      >
        &bull;
      </p>
      <p
        className={`duration-800 animate-bounce text-center text-red-600 transition-all ease-in-out ${
          showError ? 'opacity-1 h-full' : 'hidden h-[0px] opacity-0'
        }`}
      >
        {`${errorText}`}
      </p>
      <p
        className={`-translate-y-[10px] animate-pulse text-4xl text-red-600 ${
          showError ? 'opacity-1 h-full' : 'hidden h-[0px] opacity-0'
        } ${dotClassName}`}
      >
        &bull;
      </p>
    </div>
  );
};

export default TextError;
