import React from "react";
import VpnKey from "@mui/icons-material/VpnKey";
import { Button, Typography, Box } from "@mui/material";
import { UserType } from "Types/UserType";

interface props {
    user: UserType;
}
const UserDataComponent: React.FC<props> = ({
    user: { status, name, surname, email, role },
}) => {
    return (
        <Box
            sx={{
                width: "18%",
                mt: "53px",
            }}
        >
            <Box position="relative" display="flex" justifyContent="center">
                <img src="/userIcon.svg" alt="" width="232px" height="232px" />
                {role === "Admin" && <VpnKey
                    sx={{
                        position: "absolute",
                        bgcolor: "secondary.main",
                        color: "background.paper",
                        width: "24px",
                        height: "24px",
                        p: "12px 23px",
                        borderRadius: "30px",
                        top: "70%",
                        left: "70%"
                    }}
                />}
            </Box>
            <Box
                textAlign="center"
                sx={{
                    opacity: status ? "1" : "0.35",
                }}
            >
                <Typography
                    textTransform="uppercase"
                    sx={{
                        visibility: status ? "visible" : "hidden",
                        m: "15px 0 30px 0",
                        opacity: "0.2",
                    }}
                >
                    upload a photo
                </Typography>
                <Typography fontSize="48px" fontWeight="bold">
                    {name}
                </Typography>
                <Typography fontSize="48px" fontWeight="bold">
                    {surname}
                </Typography>
                <Typography>{email}</Typography>
                {status && (
                    <Button
                        sx={{
                            bgcolor: "secondary.main",
                            color: "background.paper",
                            fontWeight: 700,
                            textTransform: "capitalize",
                            mt: "50px",
                            width: "210px",
                            borderRadius: "30px",
                            height: "60px",
                            "&:hover": {
                                bgcolor: "primary.dark",
                            },
                        }}
                    >
                        Resend the invite
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default UserDataComponent;
