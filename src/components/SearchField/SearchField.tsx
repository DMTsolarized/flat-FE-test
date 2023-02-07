import React, { useState, useEffect } from "react";
import { Input, InputAdornment } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const SearchField: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || '');
    const handleFieldChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        if (value) {
            setSearchParams({search: value});
        } else {
            setSearchParams();
        }
    }, [value, setSearchParams])

    return (
        <Input
            placeholder="Type to filter the table"
            value={value}
            onChange={handleFieldChange}
            sx={{
                ml: 'auto',
                width: '350px'
            }}
            endAdornment={
                <InputAdornment position="end">
                    <SearchIcon />
                </InputAdornment>
            }
        />
    );
};

export default SearchField;
