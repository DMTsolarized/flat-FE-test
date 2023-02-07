import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Switch, FormControlLabel } from "@mui/material";
import Header from "Components/Header";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import { RootState } from "Store/store";
import EditUserForm from "Components/EditUserForm";
import UserDataComponent from "Components/UserDataComponent";
import UserPermissions from "Components/UserPermissions";
const UserEdit: React.FC = () => {
    const { userId } = useParams();
    const userIdInt: number = userId ? +userId : -1;
    const user = useSelector((state: RootState) =>
        state.userList.entities.find((user) => user.id === userIdInt)
    );
    const [active, setActive] = useState<boolean>(user ? user.status : false);

    const onActiveChange = () => {
        setActive(!active);
    };

    if (!user) {
        return <Typography>User not Found</Typography>;
    }

    return (
        <>
            <Header>
                <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="600"
                    fontSize="36px"
                    sx={{
                        ml: "100px"
                    }}
                >
                    User Setup
                </Typography>
                <Box
                    sx={{
                        bgcolor: "background.darkGray",
                        borderRadius: "50%",
                        color: "primary.dark",
                        display: "flex",
                        height: "72px",
                        justifyContent: "center",
                        left: "10%",
                        position: "absolute",
                        top: "83%",
                        width: "72px",
                    }}
                >
                    <SettingsIcon
                        sx={{
                            color: "background.paper",
                            my: "auto",
                            fontSize: "32px",
                        }}
                    />
                </Box>
            </Header>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mx: "12%",
                }}
            >
                <UserDataComponent user={{ ...user, status: active }} />
                <Box
                    sx={{
                        width: "30%",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="600"
                        fontSize="36px"
                        mt="70px"
                    >
                        Details
                    </Typography>
                    <FormControlLabel
                        label={
                            <Typography>
                                The user is{" "}
                                <strong>
                                    {active ? "Active" : "Inactive"}
                                </strong>
                            </Typography>
                        }
                        labelPlacement="end"
                        control={
                            <Switch
                                color="primary"
                                checked={active}
                                onChange={onActiveChange}
                            />
                        }
                        sx={{ my: "50px" }}
                    />
                    <EditUserForm initialValues={{ ...user, status: active }} />
                </Box>
                <Box
                    sx={{
                        width: "35%",
                    }}
                >
                    <Box display="flex" mt="70px" alignItems="flex-end">
                        <Typography
                            variant="h4"
                            component="h1"
                            fontWeight="600"
                            fontSize="36px"
                        >
                            Permissions
                        </Typography>
                        <Typography ml='auto'>{user.role}</Typography>
                    </Box>
                    <UserPermissions status={active} userId={user.id} />
                </Box>
            </Box>
        </>
    );
};

export default UserEdit;
