import React from 'react';
import styled from 'styled-components';
import {
  Button,
  ConnectedForm,
  InputField,
  Validators,
  Hint,
  Text,
  Icon
} from 'bonde-components';
import { toast } from 'react-toastify';
import { useMutation, useSession, gql } from 'bonde-core-tools';
import Panel from '../Panel';
import SelectField from '../SelectField';

const InlineFormWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 500px)) 200px;
  align-items: center;
  grid-column-gap: 20px;
  & div:nth-child(2) {
    margin-right: 35px;
  }
`;

const Inline = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    margin-right: 15px;
  }
`;

export const InviteMutation = gql`
  mutation SendInvitation ($input: InvitationInput) {
    send_invitation(input: $input) {
      user_id
      id
      role
      created_at
      updated_at
      community {
        id
        name
      }
      code
    }
  }
`;

type Values = {
  email: string
  role: string
}

type Props = {
  onSuccess: (values: Values) => Promise<any> | any
  isCommunityAdmin: boolean
}

const InviteForm = ({ onSuccess, isCommunityAdmin }: Props) => {
  const [invite] = useMutation(InviteMutation);
  const { user, community } = useSession();
  const { composeValidators, required, isEmail } = Validators;

  if (community) {
    return (
      <Panel>
        {isCommunityAdmin ? (
          <ConnectedForm
            initialValues={{ role: 2 }}
            onSubmit={async ({ email, role }) => {
              const input: any = {
                community_id: community.id,
                email,
                role,
                user_id: user.id
              };

              try {
                const { data } = await invite({ variables: { input } });

                onSuccess(data.send_invitation)
                  .then(() => {
                    toast('Convite enviado com sucesso', { type: toast.TYPE.SUCCESS });
                  })
              } catch ({ graphQLErrors, ...errors }) {
                if (graphQLErrors.filter((err: any) => err.extensions.code === 'permission-error').length > 0) {
                  toast('Ops! Seu usuário não possui permissão para essa ação, qualquer dúvida entre em contato pelo suporte.', { type: toast.TYPE.ERROR })
                } else {
                  console.error({ graphQLErrors, ...errors })
                }
              }
            }}
          >
            {({ submitting }) => (
              <InlineFormWrap>
                <InputField
                  name='email'
                  label='Enviar convite para'
                  placeholder='E-mail de cadastro do mobilizador(a)'
                  validate={
                    composeValidators(
                      required('Para convidar usuário deve preencher o e-mail'),
                      isEmail('E-mail inválido, confira se está tudo ok')
                    )
                  }
                />
                <SelectField name='role' label='Função'>
                  <option value={1}>Administrador (a)</option>
                  <option value={2}>Mobilizador (a)</option>
                </SelectField>
                <Button type='submit' disabled={submitting}>Convidar</Button>
              </InlineFormWrap>
            )}
          </ConnectedForm>
        ) : (
          <Inline>
            <Icon name='InfoMsg' />
            <Text>Apenas os administradores da comunidade podem convidar mobilizadores.</Text>
          </Inline>
        )}
      </Panel>
    );
  }

  return <h2>Community Not Found!</h2>;
};

export default InviteForm;