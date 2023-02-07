import { configureStore } from "@reduxjs/toolkit";
import UsersListSlice from "./slices/UsersListSlice";
import ModalSlice from "./slices/ModalSlice";
import PermissionsSlice from "./slices/PermissionsSlice";


export const store =  configureStore({
    reducer: {
        userList: UsersListSlice,
        modal: ModalSlice,
        permissions: PermissionsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;