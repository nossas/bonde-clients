import React from 'react'
import { Card, Gadget, Table } from 'bonde-styleguide' 
import ListEmpty from './ListEmpty'

const TableCardGadget = ({
  title,
  loading,
  data,
  columns,
  border,
  emptyIcon,
  emptyText,
  HeaderComponent
}) => (
  <Gadget
    title={title}
    WrapperComponent={({ children }) => (
      <Card height='275px'>
        {children}
      </Card>
    )}
  >
    {loading ? <p>Loading...</p> : (
      <Table
        border={border}
        data={data}
        columns={columns}
        HeaderComponent={HeaderComponent}
        EmptyComponent={() => (
          <ListEmpty
            iconColorfulName={emptyIcon}
            text={emptyText}
          />
        )}
      />
    )}
  </Gadget>
)

export default TableCardGadget
