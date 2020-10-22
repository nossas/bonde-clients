/* eslint-disable react/jsx-key */
import { useTable, useSortBy, useBlockLayout } from "react-table";
import React from "react";
import styled, { css } from "styled-components";
import { Pagination, Icon } from "bonde-components";
// import Pagination from "./Pagination";
import theme from "./theme";
import { Columns } from "../types";

const StyledTh = styled.th<{ theme: any; backgroundColor: string }>`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  color: #a4a4a4;
  text-align: left;
  padding: 10px 0 10px 20px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;

  /* Sticky */
  position: sticky !important;
  top: 0;
  z-index: 1;
  background-color: ${(props) => props.backgroundColor};

  &:last-child.sticky,
  &:first-child.sticky {
    z-index: 2;
  }

  &.hide {
    display: none;
  }
`;

const StyledTd = styled.td<{ theme: any; bold?: boolean; hide?: boolean }>`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 16px;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
  line-height: 22px;
  color: ${(props) => props.theme.commons.dark};
  letter-spacing: normal;
  word-break: break-all;

  margin: 0;
  padding: 0.5rem;
  padding-left: 20px;
  border-bottom: 1px solid #e5e5e5;

  /* The secret sauce */
  /* Each cell should grow equally */
  width: 1%;
  /* But "collapsed" cells should be as small as possible */
  &.collapse {
    width: 0.0000000001%;
  }

  &.hide {
    display: none;
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
  max-height: 700px;
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
  columns: Array<Columns>;
  data: Array<any>;
  backgroundColor: string;
  sticky?: "end" | "start";
  pagination?: {
    totalPages: number;
    goToPage: (page: number) => void;
    setPageSize: (arg0: number) => void;
    pageIndex: number;
    pageSize: number;
  };
};

function Table({
  columns,
  data,
  backgroundColor,
  sticky,
  pagination,
}: Props): React.ReactElement {
  // Use the state and functions returned from useTable to build your UI
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 200,
      maxWidth: 400,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useSortBy,
    useBlockLayout
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
                    ...column.getSortByToggleProps(),
                    className: column.className,
                    style: column.style,
                  })}
                  theme={theme}
                  backgroundColor={backgroundColor}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingRight: "5px",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon name="ArrowDown" size="small" />
                        ) : (
                          <Icon name="ArrowUp" size="small" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </StyledTh>
              ))}
            </StyledTr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} style={{ overflow: "auto" }}>
          {rows.map((row) => {
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
      {pagination && (
        <Pagination
          goToPage={pagination.goToPage}
          pageIndex={pagination.pageIndex}
          pageSize={pagination.pageSize}
          setPageSize={pagination.setPageSize}
          totalPages={pagination.totalPages}
        />
      )}
    </>
  );
}

Table.defaultProps = {
  backgroundColor: "#fff",
};

export default Table;
