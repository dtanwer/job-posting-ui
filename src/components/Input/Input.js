import React from 'react'
import { InputAdornment, TextField } from '@mui/material';

const Input = (props) => {
    const { name, placeholder, icon,endIcon, register, type="text",label ,rows,multiline=false} = props
    return (
        <TextField
            variant="outlined"
            placeholder={placeholder}
            name={name}
            type={type}
            label={label}
            rows={rows}
            multiline
            slotProps={{
                input: {
                    startAdornment: icon && (
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    ),
                    endAdornment:endIcon && (
                        <InputAdornment position="end">
                           {endIcon}
                        </InputAdornment>
                    ),
                },
            }}
            fullWidth
            className={!label && "w-full bg-[#f4f4f4]"}
            {...register(name)}
        />
    )
}

export default Input
