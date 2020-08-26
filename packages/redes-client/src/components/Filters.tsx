import React from "react";
import {
  RoundSelectField,
  InputField,
  Button,
  Icon,
  ConnectedForm,
  Form,
} from "bonde-components";
import styled from "styled-components";
import { AutoSaveFilters } from "./";
// import { useFilter } from "../utils/FilterProvider";

const Filters = (): React.ReactElement => {
  // const [, dispatch] = useFilter();
  const statusOptions = [
    {
      label: "Inscrita",
      value: "inscrita",
    },
    {
      label: "Reprovada",
      value: "reprovada",
    },
    {
      label: "Aprovada",
      value: "aprovada",
    },
  ];

  // const availabilityOptions = [
  //   {
  //     label: "Disponível",
  //     value: "disponível",
  //   },
  //   {
  //     label: "Indisponível",
  //     value: "indisponível",
  //   },
  //   {
  //     label: "Anti-ética",
  //     value: "anti-ética",
  //   },
  //   {
  //     label: "Férias",
  //     value: "férias",
  //   },
  //   {
  //     label: "Licença",
  //     value: "licença",
  //   },
  //   {
  //     label: "Descadastrada",
  //     value: "descadastrada",
  //   },
  // ];

  const stateOptions = [
    {
      value: "sp",
      label: "SP",
    },
    {
      value: "bh",
      label: "BH",
    },
    {
      value: "rj",
      label: "RJ",
    },
    {
      value: "mg",
      label: "MG",
    },
    {
      value: "rn",
      label: "RN",
    },
  ];

  // const createdAtOptions = [
  //   {
  //     value: "Disponível",
  //     label: "Disponível",
  //   },
  // ];

  // const groupOptions = [
  //   {
  //     value: "individual",
  //     label: "MSR",
  //   },
  //   {
  //     value: "therapist",
  //     label: "Psicóloga",
  //   },
  //   {
  //     value: "lawyer",
  //     label: "Advogada",
  //   },
  // ];

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

  // const save = useCallback(
  //   (values: Record<string, unknown>) => {
  //     console.log("Saving", values);
  //     setFilter({ type: "relations", value: values });
  //     return true;
  //   },
  //   [filters]
  // );

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const save = async (values: any) => {
    console.log("Saving", values);
    // dispatch({ type: "relations", value: values });
    await sleep(1000);
  };

  return (
    <Wrap>
      <ConnectedForm
        onSubmit={save}
        initialValues={{
          search: "Viviane",
          status: { value: "inscrita", label: "Inscrita" },
        }}
      >
        {({ form }) => {
          return (
            <>
              <AutoSaveFilters save={save} />
              <InputField name="search" />
              {/* <RoundSelectField
                name="group"
                placeholder="Grupo"
                options={groupOptions}
                menuPortalTarget={document.querySelector("body")}
              /> */}
              <RoundSelectField
                name="status"
                placeholder="Status"
                options={statusOptions}
                menuPortalTarget={document.querySelector("body")}
              />
              <RoundSelectField
                name="state"
                placeholder="Estado"
                options={stateOptions}
                menuPortalTarget={document.querySelector("body")}
              />
              <Button dark onClick={form.reset}>
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
