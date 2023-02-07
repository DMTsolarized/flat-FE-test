import React from "react";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import { Pagination } from "@mui/material";

const TableActionComponent: React.FC<TablePaginationActionsProps> = ({
    count,
    rowsPerPage,
    onPageChange,
    page
}) => {
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        onPageChange(null, page - 1);
    };

    return (
        <Pagination
            count={Math.ceil(count / rowsPerPage)}
            page={page + 1}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
                ml: 'auto'
            }}
        />
    );
};

export default TableActionComponent;
