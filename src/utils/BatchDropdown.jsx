import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';

const BatchDropdwon = ({ endpoint, headers, getOptionLabel, clearOnEscape, label, onChange, width  }) => {

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); // State to hold the selected option


    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(endpoint, { headers });
                console.log("new", response.data)
                if (Array.isArray(response.data.data.content)) {
                    setOptions(response.data.data.content);
                    
                } else {
                    console.error('Error: Response data is not an array');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchOptions();
    }, [endpoint, headers]);

    const handleSelectionChange = (event, value) => {
        setSelectedOption(value); // Update selected option state
        onChange(value); // Pass selected option to parent component
        // console.log("Scool Id-",value.schoolID)
    };


    return (
        <Stack spacing={1} sx={{ width: width }}>
            <Autocomplete
                id="clear-on-escape"
                options={options}
                getOptionLabel={getOptionLabel}
                clearOnEscape={clearOnEscape}
                value={selectedOption} // Set the selected option
                onChange={handleSelectionChange} // Add onChange event handler
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant="filled"
                    />
                )}
            />
        </Stack>
    );
};

export default BatchDropdwon;



