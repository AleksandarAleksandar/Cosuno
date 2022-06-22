import { style } from 'typestyle';

export const MAIN_COLOR = '#75b9be';
export const SUBTLE_WHITE = '#F7F8F9';
export const BORDER_INACTIVE = '#999';
export const INPUT_FIELD = style({
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
});
