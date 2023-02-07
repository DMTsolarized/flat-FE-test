import React from "react";
import { UserType } from "Types/UserType";
import {
    Table as TableUi,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Box,
    TablePagination,
} from "@mui/material";
import TableHeadingCell from "Components/TableHeadingCell";
import { TableFieldMapType } from "Types/TableFieldMapType";
import TableDataRow from "Components/TableDataRow";
import TableActionComponent from "Components/TableActionComponent";
import { sortType } from "Types/SortTypes";

//component can be extended to work not only for users by adding other type arrays
interface props {
    tableData: UserType[];
    tableFieldMap: TableFieldMapType[];
    hasActions?: boolean;
    containerFunctions: {
        handlePageChange: (
            event: React.MouseEvent<HTMLButtonElement> | null,
            page: number
        ) => void;
        handleSortChange: (
            event: React.MouseEvent<HTMLTableCellElement, MouseEvent> | null,
            attribute: string
        ) => void;
        handleRowsPerPageChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => void;
    };
    containerProps: {
        page: number;
        order: sortType;
        orderBy: string;
        rowsPerPage: number;
        emptyRows: number;
    };
}

const Table: React.FC<props> = ({
    tableData,
    tableFieldMap,
    hasActions = true,
    containerFunctions,
    containerProps,
}) => {
    const { handlePageChange, handleRowsPerPageChange, handleSortChange } =
        containerFunctions;
    const { page, order, orderBy, rowsPerPage, emptyRows } = containerProps;
    return (
        <Box
            sx={{
                maxWidth: "1500px",
                m: "0 auto",
            }}
        >
            <TableUi
                sx={{
                    "& .MuiTableCell-root": {
                        borderBottom: "2px solid",
                        borderColor: "background.lightGray",
                    },
                }}
            >
                <TableHead>
                    <TableRow
                        sx={{
                            textTransform: "uppercase",
                            fontWeight: "600",
                            "& .MuiTableCell-root": {
                                opacity: "35%",
                            },
                            "& .MuiTableCell-root:nth-of-type(2)": {
                                ml: "50px",
                                opacity: "100%",
                            },
                        }}
                    >
                        <TableCell
                            className="borderless"
                            sx={{
                                "&.borderless": { borderBottom: "0px" },
                                width: "5%",
                            }}
                        >
                            &nbsp;
                        </TableCell>
                        {tableFieldMap.map((field, index) => {
                            return (
                                <TableHeadingCell
                                    field={field}
                                    key={index}
                                    onSortChange={handleSortChange as any}
                                    isSorting={orderBy === field.id}
                                    order={order}
                                />
                            );
                        })}
                        {hasActions && (
                            <TableCell sx={{ width: "5%" }}>actions</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                            return (
                                <TableDataRow
                                    key={row.id}
                                    rowData={row}
                                    fieldsToMap={tableFieldMap}
                                />
                            );
                        })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: 82 * emptyRows,
                            }}
                        >
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </TableUi>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                page={page}
                count={tableData.length}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Records on page"
                onRowsPerPageChange={handleRowsPerPageChange}
                component="div"
                sx={{
                    "& .MuiTablePagination-spacer": {
                        display: "none",
                    },
                    "& .MuiTablePagination-displayedRows": {
                        display: "none",
                    },
                }}
                ActionsComponent={TableActionComponent}
            />
        </Box>
    );
};

export default Table;
