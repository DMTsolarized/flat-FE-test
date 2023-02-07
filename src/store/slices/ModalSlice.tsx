import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "Types/UserType";

interface modalState {
    activeModal: string;
    payload: UserType | null;
}

const initialState: modalState = {
    activeModal: '',
    payload: null
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, { payload: {modalId, user = null} }) => {
            state.activeModal = modalId;
            state.payload = user;
        },
        closeModal: (state) => {
            state.activeModal = '';
            state.payload = null;
        },
    },
});

export const {openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
