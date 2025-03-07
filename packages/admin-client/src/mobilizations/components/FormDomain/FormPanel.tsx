import React from 'react';
import { gql, useMutation } from 'bonde-core-tools';
import {
  Stack,
  useToast
} from 'bonde-components/chakra';
import styled from "styled-components";
// TODO: rever import
import { connect } from 'react-redux';
import * as dnsControlActions from '../../../community/action-creators/dns-control';

import DomainAutocomplete from './DomainAutocomplete';

const Styled = styled.div`
  form {
    width: 100%;
    display: flex;
    align-items: start;

    .domain-autocomplete {
      flex: 1;

      input {
        width: 100%;
        padding: 10px 20px;
      }

      ul {
        border-top: 1px solid #c7c7c7;
        list-style-type: none;
        margin: 0;
        padding: 0;
        background-color: white;

        max-height: 200px;
        overflow: auto;
        
        li {
          padding: 10px 20px;

          &:hover, &.active {
            background-color: #c7c7c7;
          }
        }
      }
    }

    button[type="submit"] {
      padding: 10px 20px;
      background-color: black;
      color: white;
      border: none;
      outline: none;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`

interface FormPanelProperties {
  hostedZones: any[];
  mobilization: any;
  updateMobilization: (obj: any) => void
}

export const FormPanel: React.FC<FormPanelProperties> = ({
  hostedZones,
  mobilization,
  updateMobilization
}) => {
  const toast = useToast();
  const domains = hostedZones.map((el) => el.domain_name);

  // Submit action to update custom domain on mobilization
  const [asyncUpdateMobilization] = useMutation(
    gql`
      mutation ($id: Int!, $customDomain: String) {
        update_mobilizations_by_pk(pk_columns: { id: $id }, _set: { custom_domain: $customDomain }) {
          id
          custom_domain
        }
      }
    `
  );

  const [routerAddOperation] = useMutation(
    gql`
      mutation ($domains: [String]!, $operation: String!) {
        router_add_operation(operation: $operation, domains: $domains)
      }
    `
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const customDomain = e.target.customDomain.value;

    if (customDomain && !domains.includes(customDomain)) {
      // Valida subdomínios
      const parts = customDomain.split('.');
  
      if (parts.length < 2) {
        toast({
          title: 'Falha ao atualizar o domínio',
          description: 'Esse domínio não é válido.',
          status: 'error',
          isClosable: true
        })
        return;
      }
    
      // Pega todos os segmentos, exceto o primeiro (subdomínio)
      const rootDomain = parts.slice(1).join('.'); 

      if (!domains.includes(rootDomain)) {
        toast({
          title: 'Falha ao atualizar o domínio',
          description: 'Você precisa usar um domínio cadastrado na Comunidade',
          status: 'error',
          isClosable: true
        })
        return;
      }
    }

    try {
      const mobilizationCustomDomain = mobilization.custom_domain?.replace("www.", "")
      console.log("mobilizationCustomDomain", mobilizationCustomDomain)
      console.log("customDomain", customDomain)
      
      if (mobilizationCustomDomain && customDomain && mobilizationCustomDomain !== customDomain) {
        await routerAddOperation({ variables: { domains: [mobilizationCustomDomain, `www.${mobilizationCustomDomain}`], operation: "remove" }}); 
        await routerAddOperation({ variables: { domains: [customDomain, `www.${customDomain}`], operation: "append" }});
        await asyncUpdateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });

        updateMobilization({...mobilization, custom_domain: `www.${customDomain}`});
      } else if (!mobilizationCustomDomain && customDomain) {
        await routerAddOperation({ variables: { domains: [customDomain, `www.${customDomain}`], operation: "append" }});
        await asyncUpdateMobilization({ variables: { id: mobilization.id, customDomain: `www.${customDomain}` } });

        updateMobilization({...mobilization, custom_domain: `www.${customDomain}`});
      } else if (mobilizationCustomDomain && !customDomain) {
        await routerAddOperation({ variables: { domains: [mobilizationCustomDomain, `www.${mobilizationCustomDomain}`], operation: "remove" }}); 
        await asyncUpdateMobilization({ variables: { id: mobilization.id, customDomain: null } });

        updateMobilization({...mobilization, custom_domain: null});
      }

      toast({ title: 'Domínio registrado com sucesso!', status: 'success', isClosable: true });
    } catch (err: any) {
      console.log("err", err);
      if (!customDomain) {
        toast({
          title: 'Falha ao atualizar o domínio',
          description: 'O endereço não pode ficar em branco',
          status: 'error',
          isClosable: true
        })
      } else {
        toast({
          title: 'Falha ao atualizar o domínio',
          description: err.message || 'Esse endereço já está sendo usado em outra página.',
          status: 'error',
          isClosable: true
        })
      }
    }
  }

  return (
    <Stack minW={[200, 400, 400, 400, 1047]} spacing={2}>
      <Styled>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <DomainAutocomplete
            name="customDomain"
            domains={domains}
            initialValue={mobilization.custom_domain ? mobilization.custom_domain.replace('www.', '') : null}
          />
          <button type="submit">Salvar</button>
        </form>
      </Styled>
    </Stack>
  );
}

export default connect(undefined, { updateDomain: dnsControlActions.updateDomain })(FormPanel);
