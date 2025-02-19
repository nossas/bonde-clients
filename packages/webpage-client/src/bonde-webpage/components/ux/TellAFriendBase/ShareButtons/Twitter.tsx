import React from 'react';
import { Translate } from  '../../../MobilizationClass';
import { Wrap } from './styles';

const TwitterShareButton = ({ href, text }: any) => {
  const handleClick = () => {
    // Optional Query params
    // via: twitter user to associate with the tweet
    // related: additional users related to the tweet comma-separated
    // hashtags: comma-separated list without #
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${href}`,
      'Compartilhar no Twitter',
      'width=800,height=600'
    );
  };

  return (
    <Translate>
    {({ t }) => (
      <Wrap>
        <button onClick={handleClick} style={{ backgroundColor: '#3DD1F4' }}>
          {t('Share Social Midia', { app: 'Twitter' })}
        </button>
      </Wrap>
    )}
    </Translate>
  );
};

export default TwitterShareButton;
