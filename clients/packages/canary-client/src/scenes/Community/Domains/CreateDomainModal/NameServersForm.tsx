import React from 'react';
import styled from 'styled-components';
import {
  Header,
  Text,
  Button,
  Icon,
  Grid,
  GridItem
} from 'bonde-components';
import NameServers from '../NameServers';
import Radio from './Radio';

const TopicList = styled.ol`
  margin-left: 20px;
  padding: 18px 0;
`;

type DNSHostedZone = {
  id: number
  name_servers: string[]
}

type Props = {
  status?: string
  changeStatus: any
  connectByIP: any
  dnsHostedZone: DNSHostedZone
}

const NameServersForm = ({ status, changeStatus, connectByIP, dnsHostedZone }: Props) => {
  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6} rowGap={6}>
      <GridItem colSpan={6}>
        <Header.H2>Agora, precisamos da sua ajuda para conectá-lo ao BONDE</Header.H2>
      </GridItem>
      <GridItem colSpan={6} rowSpan={2}>
        <Header.H4>Passo a passo</Header.H4>
        <TopicList>
          <li>
            <Text>Abra o site onde comprou o domínio, (GoDaddy.com, por exemplo), e entre nas <b>configurações do domínio</b>.</Text>
          </li>
          <li>
            <Text>Procure a opção <b>{`"Gerenciar DNS"`}</b> e clique nela.</Text>
          </li>
          <li>
            <Text>Em <b>{`"Servidores de Nome"`}</b>, selecione <b>{`"alterar"`}</b>. Depois, clique em <b>{`"Inserir meus próprios servidores de nome"`}</b>.</Text>
          </li>
          <li>
            <Text><b>Copie os 4 códigos abaixo e cole</b> nos campos que apareceram, um em cada campo. (Se necessário, pode adicionar mais campos até colar todos os quatro.)</Text>
          </li>
          <li>
            <Text>Clique em salvar.</Text>
          </li>
        </TopicList>
      </GridItem>
      <GridItem colSpan={6}>
        <NameServers dnsHostedZone={dnsHostedZone} />
      </GridItem>
      <GridItem colSpan={6}>
        <Radio>
          <input
            type='radio'
            value='registered'
            checked={status === 'registered'}
            onChange={changeStatus}
            />
          <Text>Os registros de nome foram atualizados.</Text>
        </Radio>
      </GridItem>
      <GridItem colSpan={6}>
        <Button variant="link" colorScheme="gray" type='button' onClick={connectByIP}>
          Prefiro conectar por IP (Avançado)
          <Icon name='ArrowRight' size='small' />
        </Button>
      </GridItem>
    </Grid>
  )
}

export default NameServersForm;