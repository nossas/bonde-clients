import React from 'react';
import { Text } from 'bonde-components';
import copy from 'clipboard-copy';
import { toast } from 'react-toastify';
import Tooltip from '../../../components/Tooltip';
import { Success } from '../../../components/Notifications';
import { CopyIcon } from './Icons';
import { DNS as DTRow, Col as DTCol, List as DTList, MainTitle, Button } from './Styles';

const NameServers = ({ dnsHostedZone }: any) => {
  return (
    <>
      <MainTitle>
        {`Registros de nome (Name servers)`}
        <Tooltip info='Os registros de nome ("name servers" na gringa) são usados para conectar seu domínio ao BONDE.' />
      </MainTitle>
      <DTList columnSize='auto 200px' rowSize='60px' padding='20px 20px'>
        {dnsHostedZone.name_servers.map((ns: string) => (
          <DTRow key={ns}>
            <DTCol>
              <Text>{ns}</Text>
            </DTCol>
            <DTCol>
              <Button
                onClick={() => {
                  copy(ns)
                  toast(<Success message='Name Server copiado com sucesso!' />, { type: toast.TYPE.SUCCESS });
                }}
              >
                <CopyIcon /> Copiar
              </Button>
            </DTCol>
          </DTRow>
        ))}
      </DTList>
    </>
  );
}

export default NameServers;