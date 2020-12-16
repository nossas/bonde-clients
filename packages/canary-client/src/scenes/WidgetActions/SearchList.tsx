import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchInput from '../../components/SearchInput';

const Flex = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: -15px -9px;
`;

const HeaderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

type RenderProps = {
  result: any[]
}

type Props = {
  header: any
  data: any[]
  loading?: boolean
  renderLoading?: any
  children: (props: RenderProps) => any
}

const SearchList = ({ header, children, data, loading, renderLoading }: Props) => {
  const [datalist, setDatalist] = useState(data);
  const isLoading = typeof loading !== 'undefined' && loading && !!renderLoading;

  useEffect(() => {
    setDatalist(data)
  }, [data]);

  return (
    <>
      <HeaderInfo>
        {header}
        <SearchInput
          data={data}
          field='block.mobilization.name'
          placeholder='Buscar mobilização'
          onChange={(result: any[]) => setDatalist(result)}
        />
      </HeaderInfo>
      <Flex>
        {isLoading ? renderLoading : children({ result: datalist })}
      </Flex>
    </>
  );
}

export default SearchList;