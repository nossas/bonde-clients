import React from 'react';
import TellAFriendBase from '../../components/ux/TellAFriendBase';

const DonationTellAFriend = ({
  preview,
  mobilization,
  widget,
  ...ownProps
}: any) => {
  return (
    <TellAFriendBase
      {...ownProps}
      preview={preview}
      mobilization={mobilization}
      widget={widget}
      message='Obrigada pelo apoio <3 Se selecionou a opção "boleto", dá uma olhada no seu e-mail que o link deve chegar por lá :)'
    />
  );
};

export default DonationTellAFriend;
