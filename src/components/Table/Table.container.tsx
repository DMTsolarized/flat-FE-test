import React, { useState } from "react";
import { UserType } from "Types/UserType";
import { TableFieldMapType } from "Types/TableFieldMapType";
import { useSearchParams } from "react-router-dom";
import { sortType } from "Types/SortTypes";
import Table from "./Table";

interface props {
    tableData: UserType[];
    tableFieldMap: TableFieldMapType[];
    hasActions?: boolean;
}

//logic(container) behind the table
export const TableContainer: React.FC<props> = ({ tableData, ...props }) => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [order, setOrder] = useState<sortType>("desc");
    const [orderBy, setOrderBy] = useState<string>("id");
    const [searchParams] = useSearchParams();

    const comparator = (a: any, b: any) => {
        const direction = order === "asc" ? 1 : -1;
        //neccessary since "Z" < "a"
        if (typeof a[orderBy] === "string" && typeof b[orderBy] === "string") {
            if (a[orderBy].toUpperCase() < b[orderBy].toUpperCase())
                return direction * -1;
            return direction;
        }

        if (a[orderBy] < b[orderBy]) return direction * -1;
        return direction;
    };

    const sortedUsers = [...tableData]
        .filter((user) => {
            const param = searchParams.get("search");
            if (!param) return true;
            const regex = new RegExp(param, "g");

            return (
                regex.test(user.name) ||
                regex.test(user.surname) ||
                regex.test(user.email)
            );
        })
        .sort(comparator);

    const handleSortChange = (
        event: React.MouseEvent<HTMLTableCellElement, MouseEvent> | null,
        attribute: string
    ) => {
        const isAsc = orderBy === attribute && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(attribute);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => {
        setPage(page);
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const containerFunctions = {
        handleRowsPerPageChange,
        handlePageChange,
        handleSortChange,
    };

    const containerProps = {
        page,
        order,
        orderBy,
        rowsPerPage,
        emptyRows
    };

    return (
        <Table
            tableData={sortedUsers}
            {...props}
            containerFunctions={containerFunctions}
            containerProps = {containerProps}
        />
    );
};

export default TableContainer;
