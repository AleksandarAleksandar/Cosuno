import React, { ButtonHTMLAttributes } from 'react';
import { classes } from 'typestyle';
import { stylesheet } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { MAIN_COLOR } from './constants';

const BUTTON_STYLES: NestedCSSProperties = {
    height: '3rem',
    minWidth: '8rem',
    fontWeight: 'bold',
    borderRadius: 4,
    borderStyle: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
};
const displayVariants = stylesheet({
    main: {
        ...BUTTON_STYLES,
        backgroundColor: MAIN_COLOR,
        color: 'white',
    },

    cancel: {
        ...BUTTON_STYLES,
        backgroundColor: 'transparent',
        color: 'red',
        border: '2px red',
        borderStyle: 'solid',
    },
    disabled: {
        border: `2px solid darkgray`,
        color: 'darkgray',
        backgroundColor: 'white',
        cursor: 'not-allowed !important',
    },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    display?: keyof typeof displayVariants;
};

export function Button({
    title,
    className,
    disabled = false,
    display = 'main',
    ...props
}: ButtonProps) {
    return (
        <button
            className={classes(
                displayVariants[display],
                disabled && displayVariants.disabled,
                className
            )}
            disabled={disabled}
            {...props}
        >
            {title}
        </button>
    );
}
