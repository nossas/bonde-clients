import React from "react";
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
};

const Filters = ({
  save,
  initialValues,
  options,
  reset,
  ...props
}: FilterProps): React.ReactElement => {
  return (
    <Wrap>
      <ConnectedForm onSubmit={save} initialValues={initialValues}>
        {({ form }) => {
          return (
            <>
              <AutoSaveFilters save={save} />
              {props.search && (
                <InputWithIconField
                  placeholder="Buscar nome, email, especialidade"
                  icon="Search"
                  name="search"
                />
              )}
              {props.groups && (
                <RoundSelectField
                  name="group"
                  placeholder="Grupo"
                  options={options.group as any}
                  menuPortalTarget={document.querySelector("body")}
                />
              )}
              {props.userStatus && (
                <RoundSelectField
                  name="userStatus"
                  placeholder="Status"
                  options={options.status as any}
                  menuPortalTarget={document.querySelector("body")}
                />
              )}
              {props.relationshipStatus && (
                <RoundSelectField
                  name="relationshipStatus"
                  placeholder="Status"
                  options={options.relationshipStatus as any}
                  menuPortalTarget={document.querySelector("body")}
                />
              )}
              {props.availability && (
                <RoundSelectField
                  name="availability"
                  placeholder="Disponibilidade"
                  options={options.availability as any}
                  menuPortalTarget={document.querySelector("body")}
                />
              )}
              {props.state && (
                <RoundSelectField
                  name="state"
                  placeholder="Estado"
                  options={options.state as any}
                  menuPortalTarget={document.querySelector("body")}
                />
              )}
              {props.agent && (
                <RoundSelectField
                  name="agent"
                  placeholder="Feito por"
                  options={options.agents as any}
                  menuPortalTarget={document.querySelector("body")}
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
