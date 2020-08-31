import React from "react";
import { useSession, useQuery, gql } from "bonde-core-tools";
import {
  RoundSelectField,
  InputWithIconField,
  Button,
  Icon,
  ConnectedForm,
  Form,
} from "bonde-components";
import styled from "styled-components";
import { AutoSaveFilters } from "./";

const Wrap = styled.div`
  & > ${Form} {
    display: grid;
    grid-template-columns: 15% repeat(5, minmax(100px, 200px)) auto;
    width: 100%;
    justify-content: start;
    grid-gap: 15px;
    align-items: center;
    & > div {
      padding: 0;
    }
  }
`;

type Options = {
  [x: string]: { label: string; value: string | number }[];
};

type FilterProps = {
  initialValues?: any;
  save: (e: any) => Promise<any>;
  options: Options;
  reset: () => void;
  search?: boolean;
  groups?: boolean;
  userStatus?: boolean;
  relationshipStatus?: boolean;
  state?: boolean;
  agent?: boolean;
  availability?: boolean;
  searchPlaceholder?: string;
};

const AGENTS = gql`
  query Agents($context: Int_comparison_exp!) {
    communities(where: { id: $context }) {
      community_users {
        user {
          first_name
          last_name
          id
        }
      }
    }
  }
`;

type Data = {
  communities: Array<{
    community_users: Array<{
      user: {
        first_name: string;
        last_name: string;
        id: number;
      };
    }>;
  }>;
};

const Filters = ({
  save,
  initialValues,
  options,
  reset,
  searchPlaceholder,
  ...props
}: FilterProps): React.ReactElement => {
  const { community } = useSession();
  const variables = {
    context: { _eq: community?.id },
  };
  const { loading, error, data } = useQuery<Data>(AGENTS, { variables });

  if (error) {
    console.log(error);
  }

  const agentOptions = data?.communities[0].community_users.map(({ user }) => ({
    label: `${user.first_name} ${user.last_name || ""}`,
    value: user.id,
  }));

  return (
    <Wrap>
      <ConnectedForm onSubmit={save} initialValues={initialValues}>
        {({ form }) => {
          return (
            <>
              <AutoSaveFilters save={save} />
              {props.search && (
                <InputWithIconField
                  placeholder={
                    searchPlaceholder || "Buscar nome, email, especialidade"
                  }
                  icon="Search"
                  name="query"
                />
              )}
              {props.groups && (
                <RoundSelectField
                  name="group"
                  placeholder="Grupo"
                  options={options.group}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.userStatus && (
                <RoundSelectField
                  name="userStatus"
                  placeholder="Status"
                  options={options.status}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.relationshipStatus && (
                <RoundSelectField
                  name="relationshipStatus"
                  placeholder="Status"
                  options={options.relationshipStatus}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.availability && (
                <RoundSelectField
                  name="availability"
                  placeholder="Disponibilidade"
                  options={options.availability}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.state && (
                <RoundSelectField
                  name="state"
                  placeholder="Estado"
                  options={options.state}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              {props.agent && (
                <RoundSelectField
                  name="agent"
                  placeholder="Feito por"
                  options={
                    (error || loading
                      ? [
                          {
                            value: undefined,
                            label:
                              (loading && "Carregando...") ||
                              (error &&
                                "Ocorreu um erro ao carregar os agentes da comunidade"),
                          },
                        ]
                      : agentOptions) as any
                  }
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                />
              )}
              <Button
                dark
                onClick={() => {
                  reset();
                  form.reset();
                }}
              >
                Limpar
                <Icon name="Close" size="xs" />
              </Button>
            </>
          );
        }}
      </ConnectedForm>
    </Wrap>
  );
};

export default Filters;
