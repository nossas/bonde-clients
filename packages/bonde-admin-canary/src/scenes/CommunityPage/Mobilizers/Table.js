import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  useTable,
  // useResizeColumns,
  useFlexLayout
  // useRowSelect,
} from 'react-table'

export const Styles = styled.div`
  width: 100%;
  padding: 0;
  background-color: #fff;
  box-shadow: 0 10px 20px -7px rgba(0,0,0,0.05);
  padding: 0 0 20px;

  display: block;
  overflow: auto;

  .table {
    border-spacing: 0;

    .thead {
      overflow-y: auto;
      overflow-x: hidden;

      .th {
        padding: 5px 5px;
      }
    }

    .th {
      h5 {
        text-transform: uppercase;
      }
    }

    .tbody {
      overflow-y: scroll;
      overflow-x: hidden;
      ${props => props.height && `height: ${props.height}`};

      .th, .td {
        padding: 0.7rem;
        margin: auto;
        background-color: #fff;
      }

      &::-webkit-scrollbar {
        width: 33px;
      }
      &::-webkit-scrollbar-thumb {
        background-clip: padding-box;
        background-color: rgba(74, 74, 74, 0.75);
        border-width: 20px 15px;
        border-style: solid;
        border-color: transparent;
        border-image: initial;
      }

      .tr {
        border-bottom: 1px solid #c7c7c74a;
      }
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
      border-bottom: 1px solid #c7c7c7;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.7rem;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      .resizer {
        right: 0;
        background: #c7c7c7;
        width: 10px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${''}
        touch-action :none;

        &.isResizing {
          background: #c7c7c757;
        }
      }
    }
  }
`

const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex'
    }
  }
]

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef()
//     const resolvedRef = ref || defaultRef

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate
//     }, [resolvedRef, indeterminate])

//     return (
//       <>
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     )
//   }
// )

function Table ({ columns, data }) {
  // const defaultColumn = React.useMemo(
  //   () => ({
  //     // When using the useFlexLayout:
  //     minWidth: 30, // minWidth is only used as a limit for resizing
  //     width: 250, // width is used for both the flex-basis and flex-grow
  //     maxWidth: 250, // maxWidth is only used as a limit for resizing
  //   }),
  //   []
  // )

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
      // defaultColumn
    },
    // useResizeColumns,
    useFlexLayout,
    // useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        // Let's make a column for selection
        // {
        //   id: 'selection',
        //   disableResizing: true,
        //   minWidth: 35,
        //   width: 35,
        //   maxWidth: 35,
        //   // The header can use the table's getToggleAllRowsSelectedProps method
        //   // to render a checkbox
        //   // Header: ({ getToggleAllRowsSelectedProps }) => (
        //   //   <div>
        //   //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        //   //   </div>
        //   // ),
        //   // The cell can use the individual row's getToggleRowSelectedProps method
        //   // to the render a checkbox
        //   // Cell: ({ row }) => (
        //   //   <div>
        //   //     <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        //   //   </div>
        //   // ),
        // },
        ...columns
      ])
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0].headers[0]
        selectionGroupHeader.canResize = false
      })
    }
  )

  return (
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map((headerGroup, headerIndex) => (
          <div
            key={`header-${headerIndex}`}
            {...headerGroup.getHeaderGroupProps({
              // style: { paddingRight: '15px' },
            })}
            className="tr"
          >
            {headerGroup.headers.map((column, columnIndex) => (
              <div key={`column-${headerIndex}${columnIndex}`} {...column.getHeaderProps(headerProps)} className="th">
                {column.render('Header')}
                {/* Use column.getResizerProps to hook up the events correctly */}
                {/* {column.canResize && (
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${
                      column.isResizing ? 'isResizing' : ''
                      }`}
                  />
                )} */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="tbody">
        {rows.map((row, rowIndex) => {
          prepareRow(row)
          return (
            <div key={`row-${rowIndex}`} {...row.getRowProps()} className="tr">
              {row.cells.map((cell, cellIndex) => {
                return (
                  <div key={`cell-${rowIndex}${cellIndex}`} {...cell.getCellProps(cellProps)} className="td">
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}

export default Table
