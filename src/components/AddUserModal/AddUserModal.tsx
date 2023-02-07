import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import AddUserForm from "Components/AddUserForm";
import { RootState } from "Store/store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "Store/slices/ModalSlice";
import CloseIcon from "@mui/icons-material/Close";

export const ADD_USER_MODAL = "ADD_USER_MODAL";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: "20px 32px 40px",
};

const AddUserModal: React.FC = () => {
    const dispatch = useDispatch();
    const open = useSelector(
        (state: RootState) => state.modal.activeModal === ADD_USER_MODAL
    );

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <Modal
            open={open}
            aria-labelledby="Add user dialog"
            aria-describedby="popup form for adding new users"
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box
                    onClick={handleClose}
                    sx={{ cursor: "pointer", pb: "20px", width: "fit-content", ml: "auto"}}
                >
                    <CloseIcon />
                </Box>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        m: "0 0 20px 92px",
                    }}
                >
                    Invite New User
                </Typography>
                <AddUserForm />
            </Box>
        </Modal>
    );
};

export default AddUserModal;
