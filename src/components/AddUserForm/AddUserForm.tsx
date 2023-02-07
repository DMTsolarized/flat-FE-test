import { Box, Button, Typography } from "@mui/material";
import FormField from "Components/FormField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Store/store";
import { Field, Form, Formik, FormikValues } from "formik";
import React from "react";
import * as yup from "yup";
import { addUser } from "Store/slices/UsersListSlice";
import FaceIcon from "@mui/icons-material/Face";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const AddUserForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const onSubmit = (values: FormikValues) => {
        dispatch(addUser(values));
    };

    const validationSchema = yup.object({
        name: yup.string().required("First Name is required"),
        surname: yup.string().required("Last Name is required"),
        email: yup
            .string()
            .email("email format is invalid")
            .required("email is required"),
        role: yup.string().required("Role is required"),
    });

    return (
        <Box
            sx={{
                px: "50px",
            }}
        >
            <Formik
                initialValues={{ name: "", surname: "", email: "", role: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <Form noValidate>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <FaceIcon sx={{ mr: "25px" }} />
                            <Field
                                component={FormField}
                                label={"First Name"}
                                id="name"
                                name="name"
                                required
                            />
                            <Field
                                component={FormField}
                                label={"Last Name"}
                                id="surname"
                                name="surname"
                                required
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <AlternateEmailIcon sx={{ mr: "25px" }} />
                            <Field
                                component={FormField}
                                label={"email"}
                                id="email"
                                name="email"
                                required
                                fullWidth
                            />
                        </Box>
                        <Box
                            sx={{
                                width: "50%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <VpnKeyIcon sx={{ mr: "25px" }} />
                            <Field
                                component={FormField}
                                label={"Role"}
                                id="role"
                                name="role"
                                required
                                type="select"
                                SelectProps={{
                                    native: true,
                                }}
                                fullWidth
                            >
                                <option
                                    key=""
                                    value=""
                                    style={{ display: "none" }}
                                ></option>
                                <option key="Admin" value="Admin">
                                    Admin
                                </option>
                                <option key="User" value="User">
                                    User
                                </option>
                            </Field>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                ml: "22px",
                                mt: "40px"
                            }}
                        >
                            <Button
                                type="submit"
                                sx={{
                                    bgcolor: "primary.main",
                                    textTransform: "capitalize",
                                    fontWeight: "bold",
                                    borderRadius: "30px",
                                    width: "140px",
                                    height: "40px",
                                    color: "background.paper",
                                    "&:hover": {
                                        bgcolor: "primary.light",
                                    },
                                    "&.Mui-disabled": {
                                        bgcolor: "background.lightGray",
                                        color: "#979797",
                                    },
                                }}
                                disabled={!props.isValid}
                            >
                                Send Invitation
                            </Button>
                            <Typography
                                sx={{
                                    fontStyle: "italic",
                                    color: props.isValid
                                        ? "success.main"
                                        : "error.light",
                                }}
                            >
                                {props.isValid
                                    ? "Good to go"
                                    : "Fill in all the Fields"}
                            </Typography>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddUserForm;
