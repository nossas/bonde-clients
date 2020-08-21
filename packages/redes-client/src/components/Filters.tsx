import React from "react";
import { RoundSelect, InputWithIcon, Button, Icon } from "bonde-components";
import styled from "styled-components";

const Filters = (): React.ReactElement => {
  const statusOptions = [
    {
      value: "Disponível",
      label: "Disponível",
    },
  ];
  const statusValue = {
    value: "Disponível",
    label: "Disponível",
  };

  const availabilityOptions = [
    {
      value: "Disponível",
      label: "Disponível",
    },
  ];
  const availabilityValue = {
    value: "Disponível",
    label: "Disponível",
  };

  const stateOptions = [
    {
      value: "Disponível",
      label: "Disponível",
    },
  ];
  const stateValue = {
    value: "Disponível",
    label: "Disponível",
  };

  const createdAtOptions = [
    {
      value: "Disponível",
      label: "Disponível",
    },
  ];
  const createdAtValue = {
    value: "Disponível",
    label: "Disponível",
  };

  const groupOptions = [
    {
      value: "Disponível",
      label: "Disponível",
    },
  ];
  const groupValue = {
    value: "Disponível",
    label: "Disponível",
  };

  const Wrap = styled.div`
    display: grid;
    grid-template-columns: 25% repeat(5, minmax(100px, 200px)) auto;
    width: 100%;
    justify-content: start;
    grid-gap: 15px;
    align-items: center;
  `;

  return (
    <Wrap>
      <InputWithIcon
        icon="Search"
        placeholder="Buscar nome, email, especialidade..."
      />
      <RoundSelect
        placeholder=""
        options={groupOptions}
        onChange={(e) => console.log(e)}
        value={groupValue}
        menuPortalTarget={document.querySelector("body")}
      />
      <RoundSelect
        placeholder="Status"
        options={statusOptions}
        onChange={(e) => console.log(e)}
        value={statusValue}
        menuPortalTarget={document.querySelector("body")}
      />
      <RoundSelect
        placeholder="Disponibilidade"
        options={availabilityOptions}
        onChange={(e) => console.log(e)}
        value={availabilityValue}
        menuPortalTarget={document.querySelector("body")}
      />
      <RoundSelect
        placeholder="Data Inscrição"
        options={createdAtOptions}
        onChange={(e) => console.log(e)}
        value={createdAtValue}
        menuPortalTarget={document.querySelector("body")}
      />
      <RoundSelect
        placeholder="Estado"
        options={stateOptions}
        onChange={(e) => console.log(e)}
        value={stateValue}
        menuPortalTarget={document.querySelector("body")}
      />
      <Button dark>
        Limpar
        <Icon name="Close" size="xs" />
      </Button>
    </Wrap>
  );
};

export default Filters;
