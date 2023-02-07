import { TableCell } from "@mui/material";
import React from "react";
import { sortType } from "Types/SortTypes";
import { TableFieldMapType } from "Types/TableFieldMapType";
import { TableSortLabel } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

interface props {
    field: TableFieldMapType;
    onSortChange: (
        event: React.MouseEvent<HTMLTableCellElement, MouseEvent> | null,
        attribute: string
    ) => void;
    order: sortType;
    isSorting: boolean;
}

const TableHeadingCell: React.FC<props> = ({
    field: { label, sortable, id },
    onSortChange,
    order,
    isSorting,
}) => {
    const handleSortClick =
        (label: string) =>
        (event: React.MouseEvent<HTMLTableCellElement, MouseEvent> | null) => {
            onSortChange(event, label);
        };

    return (
        <TableCell
            onClick={sortable ? handleSortClick(id) : undefined}
            sx={{
                cursor: sortable ? "pointer" : "default",
                width: '38%'
            }}
        >
            <TableSortLabel
                active={isSorting}
                direction={isSorting ? order : "asc"}
                IconComponent={ArrowDropDown}
                sx={{
                    '& .MuiTableSortLabel-icon': {
                        width: '25px',
                        height: '25px'
                    }
                }}
            >
                {label}
            </TableSortLabel>
        </TableCell>
    );
};

export default TableHeadingCell;
