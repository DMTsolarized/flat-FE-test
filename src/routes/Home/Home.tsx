import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "Store/store";
import Header from "Components/Header";
import Table from "Components/Table";
import { TableFieldMap } from "./TableFieldMap";
import AddUser from "Components/AddUser";
import AddUserModal from "Components/AddUserModal";
import SearchField from "Components/SearchField";
import DeleteUserModal from "Components/DeleteUserModal";


const Home: React.FC = () => {
    const userEntities = useSelector((state: RootState) => state.userList.entities);
    return (
        <>
            <Header>
            <Typography 
                variant="h4"
                component="h1"
                fontWeight="600"
                fontSize="32px"
                sx={{
                    ml: "100px"
                }}
            >
                Project Access
            </Typography>
            <SearchField />
            <AddUser />
        </Header>
        {<Table tableData={userEntities} tableFieldMap={TableFieldMap}/>}
        <AddUserModal />
        <DeleteUserModal />
    </>
    )
}

export default Home;
