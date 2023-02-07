import { Box, Switch, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addChildPermission,
    addPermissionGroup,
    deleteChildPermission,
    deletePermissionGroup,
} from "Store/slices/PermissionsSlice";
import { RootState } from "Store/store";
import Fade from "@mui/material/Fade";

interface props {
    status: boolean;
    userId: number;
}

const UserPermissions: React.FC<props> = ({ status, userId }) => {
    const dispatch = useDispatch();
    const { entities, userPermissions } = useSelector((state: RootState) => {
        const { entities, userPermissions: permissions } = state.permissions;
        const userPermissions = permissions.find(
            (userPermission) => userPermission.userId === userId
        ) || {
            userId: userId,
            permissions: {},
        };
        return {
            entities,
            userPermissions,
        };
    });

    const handlePermissionClick = (permissionId: number) => () => {
        if (permissionId in userPermissions.permissions) {
            dispatch(deletePermissionGroup({ userId, permissionId }));
        } else {
            dispatch(addPermissionGroup({ userId, permissionId }));
        }
    };

    const handleChildPermissionClick =
        (permissionId: number, parentId: number, isChecked: boolean) => () => {
            if (isChecked) {
                dispatch(
                    deleteChildPermission({ userId, permissionId, parentId })
                );
            } else {
                dispatch(
                    addChildPermission({ userId, permissionId, parentId })
                );
            }
        };

    return (
        <Box
            my="50px"
            position="relative"
            sx={{
                opacity: status ? "1" : "0.35",
            }}
        >
            {entities.map((permissionGroup) => {
                const isChecked =
                    permissionGroup.id in userPermissions.permissions;

                return (
                    <Box
                        key={permissionGroup.id}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: "15px",
                            borderBottom: "1px solid",
                            borderBottomColor: "background.darkGray",
                        }}
                    >
                        <Typography>{permissionGroup.label}</Typography>
                        <Switch
                            checked={isChecked}
                            onClick={handlePermissionClick(permissionGroup.id)}
                            disabled={!status}
                        />
                        <Fade in={isChecked}>
                            <Box
                                sx={{
                                    overflow: "hidden",
                                    height: isChecked ? "fit-content" : "0px",
                                    flexBasis: "100%",
                                }}
                            >
                                {permissionGroup.children?.map((permission) => {
                                    const isChildChecked =
                                        permissionGroup.id in
                                            userPermissions.permissions &&
                                        userPermissions.permissions[
                                            permissionGroup.id
                                        ].includes(permission.id);

                                    return (
                                        <Box
                                            key={permission.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                ml: "30px",
                                            }}
                                        >
                                            <Typography>
                                                {permission.label}
                                            </Typography>
                                            <Switch
                                                checked={isChildChecked}
                                                onClick={handleChildPermissionClick(
                                                    permission.id,
                                                    permissionGroup.id,
                                                    isChildChecked
                                                )}
                                                disabled={!status}
                                            />
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Fade>
                    </Box>
                );
            })}
        </Box>
    );
};

export default UserPermissions;
