import { TableCell, TableRow, Typography, Switch, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Store/store";
import { updateUser } from "Store/slices/UsersListSlice";
import { TableFieldMapType } from "Types/TableFieldMapType";
import { UserType } from "Types/UserType";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { openModal } from "Store/slices/ModalSlice";
import { Link } from "react-router-dom";
import { DELETE_USER_MODAL } from "Components/DeleteUserModal/DeleteUserModal";

interface props {
    rowData: UserType;
    fieldsToMap: TableFieldMapType[];
    hasActions?: boolean;
}

const TableDataRow: React.FC<props> = ({
    rowData,
    fieldsToMap,
    hasActions = true,
}) => {
    const dispatch = useDispatch<AppDispatch>();

    const [active, setActive] = useState<boolean>(rowData.status);

    const handleChange = (): void => {
        dispatch(updateUser({ ...rowData, status: !active }));
        setActive(!active);
    };

    const handleDeleteClick = () => {
        dispatch(openModal({ modalId: DELETE_USER_MODAL, user: rowData }));
    };

    return (
        <TableRow>
            <TableCell
                className="borderless"
                sx={{
                    opacity: !active ? "35%" : "100%",
                    "&.borderless": { borderBottom: "0px" },
                }}
            >
                <img src="/userIcon.svg" alt="" />
            </TableCell>
            {fieldsToMap.map((field, index) => {
                const isAdmin = field.id === "role" && rowData.role === "Admin";

                return (
                    <TableCell
                        key={index}
                        sx={{
                            opacity:
                                !active && field.label !== "status"
                                    ? "35%"
                                    : "100%",
                            verticalAlign: "middle",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            {isAdmin && (
                                <VpnKeyIcon
                                    sx={{
                                        position: "absolute",
                                        bgcolor: active
                                            ? "secondary.main"
                                            : "transparent",
                                        color: active
                                            ? "background.paper"
                                            : "disabled",
                                        width: "24px",
                                        height: "24px",
                                        p: "4px 12px",
                                        borderRadius: "30px",
                                        right: "100%",
                                    }}
                                />
                            )}
                            {field.fields.map((pointer, index) => {
                                const pointerArray = pointer.split(",");

                                const keyPointer =
                                    pointerArray.length === 1
                                        ? (pointer as keyof typeof rowData)
                                        : (pointerArray[0] as keyof typeof rowData);

                                const secondaryKey =
                                    pointerArray.length > 1 &&
                                    (pointerArray[1] as keyof typeof rowData);

                                if (typeof rowData[keyPointer] !== "boolean") {
                                    return (
                                        <Typography
                                            key={index}
                                            flexBasis={
                                                index > 0 ? "100%" : "inherit"
                                            }
                                            ml="5px"
                                            textTransform="capitalize"
                                        >
                                            {rowData[keyPointer]}{" "}
                                            {secondaryKey &&
                                                rowData[secondaryKey]}
                                        </Typography>
                                    );
                                }
                                return (
                                    <Switch
                                        key={index}
                                        color="primary"
                                        checked={rowData[keyPointer] as boolean}
                                        onChange={handleChange}
                                    />
                                );
                            })}
                        </Box>
                    </TableCell>
                );
            })}
            {hasActions && (
                <TableCell align="right">
                    {active && (
                        <Box component={Link} to={'/customer/' + rowData.id}>
                            <SettingsIcon
                                color="disabled"
                                sx={{
                                    "&:hover": {
                                        color: "primary.main",
                                    },
                                }}
                            />
                        </Box>
                    )}
                    <DeleteIcon
                        color="disabled"
                        sx={{
                            "&:hover": {
                                color: "error.main",
                            },
                            cursor: "pointer",
                        }}
                        onClick={handleDeleteClick}
                    />
                </TableCell>
            )}
        </TableRow>
    );
};

export default TableDataRow;
