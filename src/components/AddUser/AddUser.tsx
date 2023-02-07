import React from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AppDispatch } from "Store/store";
import { openModal } from "Store/slices/ModalSlice";
import { ADD_USER_MODAL } from "Components/AddUserModal/AddUserModal";

const AddUser: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleOpen = () => dispatch(openModal({modalId: ADD_USER_MODAL}));
    return (
            <Box
                sx={{
                    bgcolor: "primary.dark",
                    borderRadius: "50%",
                    color: "primary.dark",
                    cursor: "pointer",
                    display: "flex",
                    height: "72px",
                    justifyContent: "center",
                    left: "10%",
                    position: "absolute",
                    top: "83%",
                    width: "72px",
                }}
                onClick={handleOpen}
            >
                <AddIcon
                    sx={{
                        color: "background.paper",
                        my: "auto",
                        fontSize: "32px",
                    }}
                />
            </Box>
    );
};

export default AddUser;
