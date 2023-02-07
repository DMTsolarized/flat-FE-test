import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { RootState } from "Store/store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "Store/slices/ModalSlice";
import FaceIcon from "@mui/icons-material/Face";
import { deleteUser } from "Store/slices/UsersListSlice";
import CloseIcon from "@mui/icons-material/Close";

export const DELETE_USER_MODAL = "DELETE_USER_MODAL";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 646,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: "22px 32px 32px",
};

const AddUserModal: React.FC = () => {
    const dispatch = useDispatch();
    const modalData = useSelector((state: RootState) => state.modal);
    const open = modalData.activeModal === DELETE_USER_MODAL;
    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleClick = () => {
        dispatch(deleteUser({ id: modalData.payload?.id }));
        handleClose();
    };
    return (
        <Modal
            open={open}
            aria-labelledby="Delete user dialog"
            aria-describedby="popup confirmation for user deletion"
            onClose={handleClose}
        >
            <Box sx={style}>
                <Box
                    onClick={handleClose}
                    sx={{
                        cursor: "pointer",
                        pb: "12px",
                        width: "fit-content",
                        ml: "auto",
                    }}
                >
                    <CloseIcon />
                </Box>
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        m: "20px 0 20px 92px",
                    }}
                >
                    Delete User
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        m: "0 120px 20px 45px",
                        pt: "20px",
                    }}
                >
                    <FaceIcon />
                    <Box
                        sx={{
                            display: "flex",
                            flexGrow: 1,
                            ml: "24px",
                            justifyContent: "space-between",
                            p: "0 0 40px 0",
                            borderBottom: "1px solid",
                            borderColor: "background.lightGray",
                        }}
                    >
                        <Typography>
                            {modalData.payload?.name}{" "}
                            {modalData.payload?.surname}
                        </Typography>
                        {modalData.payload?.status && (
                            <Typography color='primary' fontWeight="bold">Active User</Typography>
                        )}
                    </Box>
                </Box>
                <Button
                    sx={{
                        bgcolor: "error.light",
                        textTransform: "capitalize",
                        color: "background.paper",
                        borderRadius: "30px",
                        m: "40px 0 0 92px",
                        width: "150px",
                        "&:hover": {
                            bgcolor: "error.main",
                        },
                    }}
                    onClick={handleClick}
                >
                    Delete User
                </Button>
            </Box>
        </Modal>
    );
};

export default AddUserModal;
