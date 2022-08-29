import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

import { FAQs } from '@/components/constants';

const FAQ = () => {
  const [selectedFAQ, setSelectedFAQ] = useState<string | null>(null);

  const onFAQClick = (faqId: string) => {
    if (selectedFAQ === faqId) {
      setSelectedFAQ(null);
    } else {
      setSelectedFAQ(() => faqId);
    }
  };

  return (
    <section className='padding-sides my-[80px]'>
      <div className='max-width max-w-[1200px] '>
        <h2 className='sc-heading mb-[20px]'>Frequently Asked Questions</h2>
        {FAQs.map(({ id, question, answer }, faqI) => (
          <div key={id} className='text-primary-500'>
            <div
              onClick={() => onFAQClick(id)}
              onKeyDown={() => onFAQClick(id)}
              tabIndex={faqI}
              role='button'
              className={`flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-[20px] px-[80px] transition-all duration-300 ease-in-out hover:bg-neutral-300 ${
                selectedFAQ === id && 'bg-neutral-300'
              }`}
            >
              <h2 className='text-lg font-semibold'>{question}</h2>
              {selectedFAQ === id ? (
                <AiOutlineClose className='text-2xl' />
              ) : (
                <AiOutlinePlus className='text-2xl' />
              )}
            </div>
            <div
              className={`duration-7000 space-y-3 px-[80px] py-4 transition-all ease-in-out ${
                selectedFAQ === id
                  ? 'opacity-1 visible block h-full'
                  : 'invisible absolute h-[0px] bg-white opacity-0'
              }`}
            >
              {answer.map(({ text, coloredText, link }, index) => {
                if (!coloredText) {
                  return (
                    <p key={index} className='text-infoText'>
                      {text}
                    </p>
                  );
                }

                const newText: string[] = text.split(coloredText);
                const texts: string[] = [newText[0], coloredText, newText[1]];

                return (
                  <p key={index} className='text-infoText'>
                    {texts.map((txt, tIndex) => {
                      if (link && tIndex === 1) {
                        return (
                          <Link key={tIndex} href={link} passHref>
                            <a className='text-primary-200'>{txt}</a>
                          </Link>
                        );
                      }

                      return (
                        <span
                          className={`${tIndex === 1 && 'text-primary-200'}`}
                          key={tIndex}
                        >
                          {txt}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
            {/* )} */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
