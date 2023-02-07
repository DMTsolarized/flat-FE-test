import { createSlice } from "@reduxjs/toolkit";
import { PermissionsType, userPermissionsType } from "Types/UserType";
import data from "data.json";

interface permissionsListState {
    entities: PermissionsType[];
    userPermissions: userPermissionsType[];
}

const initialState: permissionsListState = {
    //TODO: localStorage
    entities: data.permissions,
    userPermissions: data.userPermissions,
};

const PermissionsListSlice = createSlice({
    name: "permissionsList",
    initialState,
    reducers: {
        deletePermissionGroup: (
            { userPermissions },
            { payload: { userId, permissionId } }
        ) => {
            const userIndex = userPermissions.findIndex(
                (user) => user.userId === userId
            );
            delete userPermissions[userIndex].permissions[permissionId];
        },
        addPermissionGroup: (
            { userPermissions },
            { payload: { userId, permissionId } }
        ) => {
            const userIndex = userPermissions.findIndex(
                (user) => user.userId === userId
            );
            if (userIndex < 0) {
                userPermissions.push({
                    userId: userId,
                    permissions: {
                        [permissionId]: [],
                    },
                });
            } else {
                userPermissions[userIndex].permissions[permissionId] = [];
            }
        },
        addChildPermission: (
            { userPermissions },
            { payload: { userId, permissionId, parentId } }
        ) => {
            const userIndex = userPermissions.findIndex(
                (user) => user.userId === userId
            );
            userPermissions[userIndex].permissions[parentId].push(permissionId);
        },
        deleteChildPermission: (
            { userPermissions },
            { payload: { userId, permissionId, parentId } }
        ) => {
            const userIndex = userPermissions.findIndex(
                (user) => user.userId === userId
            );
            userPermissions[userIndex].permissions[parentId] = userPermissions[
                userIndex
            ].permissions[parentId].filter(
                (permission) => permission !== permissionId
            );
        },
    },
});

export const {
    deletePermissionGroup,
    addPermissionGroup,
    addChildPermission,
    deleteChildPermission,
} = PermissionsListSlice.actions;

export default PermissionsListSlice.reducer;
