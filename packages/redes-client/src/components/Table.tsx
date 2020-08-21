/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import { useTable, usePagination } from "react-table";
import React from "react";
import styled, { css } from "styled-components";
import { Pagination } from "bonde-components";
import theme from "./theme";

const StyledTh = styled.th<{ theme: any }>`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  color: #a4a4a4;
  text-align: left;
  padding: 10px 0 10px 20px;
  border-bottom: 1px solid #e5e5e5;
`;

const StyledTd = styled.td<{ theme: any; bold?: boolean }>`
  min-width: 300px;

  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  line-height: 22px;
  color: ${(props) => props.theme.commons.dark};
  text-align: center;
  letter-spacing: normal;

  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid #e5e5e5;

  /* The secret sauce */
  /* Each cell should grow equally */
  width: 1%;
  /* But "collapsed" cells should be as small as possible */
  &.collapse {
    width: 0.0000000001%;
  }
`;

const StyledTr = styled.tr`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
`;

const StyledTable = styled.table<{ backgroundColor: string; sticky: string }>`
  overflow: auto;
  display: inherit;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-spacing: 0;
  background-color: ${(props) => props.backgroundColor};

  ${({ sticky }) =>
    sticky === "end" &&
    css`
      .sticky {
        right: 0;
      }
      tr {
        th:last-child,
        td:last-child {
          border-left: 1px solid #e5e5e5;
        }
      }
    `}

  ${({ sticky }) =>
    sticky === "start" &&
    css`
      .sticky {
        left: 0;
      }
      tr {
        th:first-child,
        td:first-child {
          border-right: 1px solid #e5e5e5;
        }
      }
    `}

  .sticky {
    position: sticky !important;
    top: 0;
    z-index: 1;
    background-color: ${(props) => props.backgroundColor};
  }
`;

type Props = {
  columns: Array<{
    Header: string;
    accessor: string;
    className?: string;
    columns?: Array<{
      Header: string;
      accessor: string;
      className: string;
    }>;
  }>;
  data: Array<any>;
  backgroundColor: string;
  sticky?: "end" | "start";
};

function Table({
  columns,
  data,
  backgroundColor,
  sticky,
}: Props): React.ReactElement {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    // The rest of these things are super handy, too ;)
    pageCount,
    pageOptions,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <StyledTable
        sticky={sticky as string}
        backgroundColor={backgroundColor}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <StyledTr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <StyledTh
                  {...column.getHeaderProps({
                    className: column.className,
                    style: column.style,
                  })}
                  theme={theme}
                >
                  {column.render("Header")}
                </StyledTh>
              ))}
            </StyledTr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <StyledTr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <StyledTd
                    {...cell.getCellProps({
                      className: cell.column.className,
                      style: cell.column.style,
                      bold: cell.column.bold,
                    })}
                    theme={theme}
                  >
                    {cell.render("Cell")}
                  </StyledTd>
                ))}
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>
      <Pagination
        goToPage={gotoPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={pageOptions.length}
      />
    </>
  );
}

Table.defaultProps = {
  backgroundColor: "#fff",
};

export default Table;
