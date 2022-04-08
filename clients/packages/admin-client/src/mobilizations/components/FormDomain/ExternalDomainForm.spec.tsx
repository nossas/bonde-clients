import React from 'react';
import { shallow } from 'enzyme';
import { ListItem, OrderedList, Text } from 'bonde-components/chakra';
import { Field } from 'bonde-components/form';
import ExternalDomainForm from './ExternalDomainForm';

describe('ExternalDomainForm tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ExternalDomainForm />)
  })

  it('should renders is ok', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should render description to explain form', () => {
    const text = wrapper.find(Text).at(0);
    expect(text.props().children)
      .toEqual('Insira abaixo o domínio, salve as alterações e siga o passo a passo para configurá-lo:');
  });

  it('should render domain input', () => {
    const field = wrapper.find(Field).at(0);
    expect(field.props().name).toEqual('domain');

    const input = field.renderProp('children')({ input: {} });
    expect(input.props().placeholder).toEqual('seudominio.org');
  });

  it('should render steps to settings DNS', () => {
    const orderedList = wrapper.find(OrderedList);
    expect(orderedList.length).toEqual(1);

    const listItems = wrapper.find(ListItem);

    expect(listItems.at(0).props().children)
      .toEqual('Abra o site onde você comprou o domínio (GoDaddy.com, por exemplo);');
    expect(listItems.at(1).props().children)
      .toEqual('Entre nas configurações do domínio que você inseriu no BONDE;');
    expect(listItems.at(2).props().children)
      .toEqual('Procure a opção "Manage DNS" e clique nela;');
    expect(listItems.at(3).props().children)
      .toEqual('Em "Records", clique em "add", no canto inferior direito;');
    expect(listItems.at(4).props().children)
      .toEqual('Selecione "A", em "Type";');
    expect(listItems.at(5).props().children)
      .toEqual('Em "Host", escreva o subdomínio com e sem "www";');
    expect(listItems.at(6).props().children)
      .toEqual('Em "Points to", preencha com o seguinte IP: 54.156.173.29');
    expect(listItems.at(7).props().children)
      .toEqual('Em "TTL", selecione "¹/² hour" e clique em "save";');
  });
});