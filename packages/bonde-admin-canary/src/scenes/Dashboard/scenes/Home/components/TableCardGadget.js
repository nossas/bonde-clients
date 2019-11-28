import React from 'react'
import { Card, Flexbox2 as Flexbox, Table } from 'bonde-styleguide'
import { Gadget } from 'components'
import ListEmpty from './ListEmpty'
import PropTypes from 'prop-types'

const TableCardGadget = ({
  title,
  data,
  columns,
  border,
  emptyIcon,
  emptyText,
  renderFilter,
  renderPagination,
  HeaderComponent,
  pageIndex,
  pageTotal,
  onClickRow,
  height
}) => {
  return (
    <Gadget
      title={title}
      renderFilter={renderFilter}
      WrapperComponent={({ children }) => (
        <Card height={height}>
          {children}
        </Card>
      )}
    >
      <Flexbox vertical>
        <Table
          borderBottom
          border={border}
          data={data}
          columns={columns}
          onClickRow={onClickRow}
          HeaderComponent={HeaderComponent}
          EmptyComponent={() => (
            <ListEmpty
              iconColorfulName={emptyIcon}
              text={emptyText}
            />
          )}
        />
        {renderPagination && renderPagination()}
      </Flexbox>
    </Gadget>
  )
}

TableCardGadget.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    render: PropTypes.func,
    props: PropTypes.any
  })),
  border: PropTypes.bool,
  emptyIcon: PropTypes.string,
  emptyText: PropTypes.string,
  renderFilter: PropTypes.func,
  renderPagination: PropTypes.func,
  HeaderComponent: PropTypes.node,
  pageIndex: PropTypes.number,
  pageTotal: PropTypes.number,
  onClickRow: PropTypes.func,
  height: PropTypes.string
}

TableCardGadget.defaultProps = {
  data: [],
  height: '565px'
}

export default TableCardGadget
