import React from 'react'
import { InputAdornment, TextField } from '@mui/material';

const Input = (props) => {
    const { name, placeholder, icon,endIcon, register, type="text" } = props
    return (
        <TextField
            variant="outlined"
            placeholder={placeholder}
            name={name}
            type={type}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    ),
                    endAdornment:(
                        <InputAdornment position="end">
                           {endIcon}
                        </InputAdornment>
                    ),
                },
            }}
            className="w-full bg-[#f4f4f4]"
            {...register(name)}
        />
    )
}

export default Input
