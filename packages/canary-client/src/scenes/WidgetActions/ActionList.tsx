import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from 'bonde-components';
import SearchInput from '../../components/SearchInput';

const Flex = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin: -10px;
`;

const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ActionList = ({ children, widgets }: any) => {
  const [data, setData] = useState(widgets);

  return (
    <>
      <HeaderInfo>
        <Header.H5 uppercase>Ações</Header.H5>
        <SearchInput
          data={widgets}
          field='block.mobilization.name'
          placeholder='Buscar mobilização'
          onChange={(result) => setData(result)}
        />
      </HeaderInfo>
      <Flex>
        {children({ result: data })}
      </Flex>
    </>
  );
}

export default ActionList;