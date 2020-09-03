import React from "react";
import { useCommunityExtra } from "../services/CommunityExtraProvider";
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
  onGroupChange: (e: any) => void;
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

const Filters = ({
  save,
  initialValues,
  options,
  reset,
  searchPlaceholder,
  onGroupChange,
  ...props
}: FilterProps): React.ReactElement => {
  const { users } = useCommunityExtra();

  const agentOptions = users?.map(({ user }) => ({
    label: `${user.firstName} ${user.lastName || ""}`,
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
                  options={options.groups}
                  menuPortalTarget={document.querySelector("body")}
                  isClearable={true}
                  onChange={onGroupChange}
                />
              )}
              {props.userStatus && (
                <RoundSelectField
                  name="userStatus"
                  placeholder="Status"
                  options={options.userStatus}
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
                  options={agentOptions as any}
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

Filters.defaultProps = {
  onGroupChange: (e: any) => e,
};

export default Filters;
