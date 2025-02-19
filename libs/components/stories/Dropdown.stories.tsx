import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import {
  Navbar,
  Dropdown,
  DropdownIconItem,
  DropdownImageInput,
  DropdownImageItem,
  Header,
  // Text
} from '@';

const RenderLabel = ({ label, email }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Header.H4>{label}</Header.H4>
    <Header.H5>{email}</Header.H5>
  </div>
);

export const communities = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [item, setItem] = useState(undefined);

  return (
    <Navbar brand="small" indexRoute="/">
      <Dropdown
        placeholder="Selecione uma comunidade"
        item={item}
        items={[
          {
            img: {
              src:
                'https://s3.amazonaws.com/hub-central/uploads/1540751246_Ninguemficapratras-Logo.png',
              alt: 'Ninguém fica pra trás',
            },
            label: 'Ninguém fica pra trás',
          },
          {
            img: {
              src:
                'https://s3.amazonaws.com/hub-central/uploads/1484260522_reboo.png',
              alt: 'Meu Rio',
            },
            label: 'Meu Rio',
          },
          {
            img: {
              src:
                'https://s3.amazonaws.com/hub-central/uploads/1502212636_betaavatar.png',
              alt: 'BETA',
            },
            label: 'BETA',
          },
        ]}
        onSelect={(value: any) => {
          setItem(value);
          action('SelectDropdown')(value);
        }}
        dropdownInput={DropdownImageInput}
        dropdownItem={DropdownImageItem}
      />

      <Dropdown
        selectable={false}
        direction="right"
        placeholder="Katia Maria"
        item={item}
        items={[
          {
            clickable: false,
            img: {
              src:
                'https://s3.amazonaws.com/hub-central/uploads/1484260522_reboo.png',
              alt: 'User IMAGE',
            },
            label: 'Katia Maria',
            email: 'katia@maria.org',
            render: ({ value }) => {
              const { img, label, email } = value;
              return (
                <DropdownImageItem
                  value={{
                    img,
                    label: <RenderLabel label={label} email={email} />,
                  }}
                />
              );
            },
          },
          {
            icon: 'User',
            label: 'Perfil',
          },
          {
            icon: 'Close',
            label: 'Logout',
          },
        ]}
        onSelect={(value: any) => {
          action('SelectDropdown')(value);
        }}
        dropdownItem={DropdownIconItem}
      />
    </Navbar>
  );
};

export default {
  title: 'Dropdown',
};
