import {  FieldProps } from "formik";
import { TextField } from "@mui/material";
import { FCC } from "Types/FCC";

interface props {
    type: string;
    label: string;
}

const FormField: FCC<FieldProps & props> = ({
    field,
    form: { touched, errors },
    type,
    label,
    children,
    ...props
}) => {
    return <TextField 
            label={label}
            {...field}
            error={Boolean(touched[field.name] && errors[field.name])}
            {...props}
            variant="standard"
            size="small"
            select={type === 'select'}
            sx={{
                mb:'25px'
            }}
        >
            {children}
        </TextField>;
};

export default FormField;
