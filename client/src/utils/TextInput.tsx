import React, { InputHTMLAttributes } from 'react';
import { stylesheet } from 'typestyle';
import { BORDER_INACTIVE, SUBTLE_WHITE } from './constants';

const styles = stylesheet({
    input: {
        display: 'block',
        height: '1rem',
        minWidth: '4rem',
        border: `1px solid ${BORDER_INACTIVE}`,
        borderRadius: 4,
        padding: '0.5rem',
        color: 'black',
        $nest: {
            '&::placeholder': {
                // borderColor: BORDER_INACTIVE,
            },
            '&:hover': {
                backgroundColor: SUBTLE_WHITE,
            },
            '&:focus': {
                borderWidth: 2,
                borderColor: 'blue',
                outline: `none`,
            },
        },
    },
});
type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    errored?: boolean;
    disabled?: boolean;
    setValue: (value: string) => void;
};

export function TextInput({ value, setValue, placeholder, ...props }: TextInputProps) {
    return (
        <input
            className={styles.input}
            type={'text'}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
        />
    );
}
