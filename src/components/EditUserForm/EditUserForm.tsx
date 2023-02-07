import { Box, Button } from "@mui/material";
import FormField from "Components/FormField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "Store/store";
import { Field, Form, Formik, FormikValues } from "formik";
import React from "react";
import * as yup from "yup";
import { updateUser } from "Store/slices/UsersListSlice";
import { UserType } from "Types/UserType";
import { useNavigate } from "react-router-dom";

interface props {
    initialValues: UserType;
}
const EditUserForm: React.FC<props> = ({ initialValues }) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const onSubmit = (values: FormikValues) => {
        //actual dispatch
        dispatch(updateUser({ ...initialValues, ...values }));
        navigate('/');
    };

    const validationSchema = yup.object({
        name: yup.string().required("First Name is required"),
        surname: yup.string().required("Last Name is required"),
        role: yup.string().required("Role is required"),
    });

    return (
        <Box
            sx={{
                px: "50px",
            }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form noValidate>
                        <Field
                            component={FormField}
                            label={"First Name"}
                            id="name"
                            name="name"
                            required
                            disabled={!initialValues.status}
                            fullWidth
                        />
                        <Field
                            component={FormField}
                            label={"Last Name"}
                            id="surname"
                            name="surname"
                            required
                            disabled={!initialValues.status}
                            fullWidth
                        />
                        <Field
                            component={FormField}
                            label={"Role"}
                            id="role"
                            name="role"
                            required
                            disabled={!initialValues.status}
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
                        <Box
                            sx={{
                                display: initialValues.status
                                    ? "block"
                                    : "none",
                            }}
                        >
                            <Button
                                type="submit"
                                sx={{
                                    bgcolor: "primary.main",
                                    color: "background.paper",
                                    fontWeight: 700,
                                    textTransform: "capitalize",
                                    mt: '120px',
                                    width: '210px',
                                    borderRadius: '30px',
                                    height: '60px',
                                    '&:hover': {
                                        bgcolor: "primary.light"
                                    },
                                }}
                            >
                                save changes
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default EditUserForm;
