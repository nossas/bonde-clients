import React from 'react';
import { Translate } from '../../../MobilizationClass';
import { Wrap } from './styles';

const FacebookShareButton = ({ href }: any) => {
  const handleClick = () => {
    window.open(
      `http://www.facebook.com/sharer.php?u=${href}`,
      'Compartilhar no Facebook',
      'width=800,height=600'
    );
  };

  return (
    <Translate>
    {({ t }) => (
      <Wrap>
        <button onClick={handleClick} style={{ backgroundColor: '#2D88ED' }}>
          {t('Share Social Midia', { app: 'Facebook' })}
        </button>
      </Wrap>
    )}
    </Translate>
  );
};

export default FacebookShareButton;
