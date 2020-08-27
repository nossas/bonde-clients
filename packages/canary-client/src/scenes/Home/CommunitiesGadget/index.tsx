import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from 'bonde-components';
import { useSession } from 'bonde-core-tools';

import SearchInput from './SearchInput';
import CommunitiesScrollBox from './CommunitiesScrollBox';

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 15px;

    ${Header.H5} {
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

const CommunitiesGadget = () => {
  const { communities } = useSession()
  const [data, setData] = useState(communities)

  return (
    <Styles>
      <div className='header'>
        {/** TODO: i18n */}
        <Header.H5>Suas comunidades</Header.H5>
        <SearchInput
          placeholder='Buscar comunidade'
          field='name'
          data={communities}
          onChange={setData}
        />
      </div>
      <CommunitiesScrollBox communities={data} />
    </Styles>
  )
};

export default CommunitiesGadget;
