import React, { memo } from 'react';
import styled from '@emotion/styled';

type Props = {
  color?: string;
};

const Text = styled.span<Props>`
  display: block;
  background: none;
  color: ${(props) => props.color || '#fff'};
  font-size: 14px;
  text-align: left;
  margin: 1.5rem 0 1rem 0;

  a {
    color: ${(props) => props.color || '#fff'};
  }
`;

// eslint-disable-next-line react/display-name
export default memo(({ color }: any) => {
  return (
    <Text color={color}>
      {`Ao inserir seus dados, você concorda em ter seus dados compartilhados com os organizadores dessa página e aceita receber comunicações de atualização, conforme descrito nos `}
      <a
        href='/static/termos-de-uso-plip.pdf'
        title={'Termos de uso'}
        target="_blank"
        rel="noopener noreferrer"
      >
        termos de uso
      </a>
      {` da campanha e na `}
      <a
        href={'/static/politica-de-privacidade.pdf'}
        title={'Política de privacidade'}
        target="_blank"
        rel="noopener noreferrer"
      >
        política de privacidade
      </a>
      {`. Você pode cancelar o recebimento desses e-mails a qualquer momento.`}
    </Text>
  );
});
