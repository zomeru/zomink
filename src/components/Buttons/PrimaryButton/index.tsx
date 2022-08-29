import React from 'react';

export interface PrimaryButtonProps {
  btnProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  btnProps,
  children,
}) => {
  return (
    <button
      {...btnProps}
      type='button'
      className='h-[45px] rounded-lg bg-primary-200 px-[20px] text-white transition-all duration-200 ease-in-out hover:bg-primary-300'
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
