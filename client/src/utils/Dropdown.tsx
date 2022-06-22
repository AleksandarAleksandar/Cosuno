import React from 'react';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { classes, style, stylesheet } from 'typestyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import { MAIN_COLOR, SUBTLE_WHITE } from './constants';

const styles = stylesheet({
    dropdownWrapper: {
        position: 'relative',
    },
    dropdownButtonIcon: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: MAIN_COLOR,
        $nest: {
            '& > *': {
                padding: '5px',
            },
        },
    },
    searchInput: {
        $nest: {
            '& > input': {
                border: 'none',
            },
            '& > input:hover': {
                backgroundColor: 'gray',
            },
        },
    },
    list: {
        listStyle: 'none',
        border: `1px solid #999`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        maxHeight: '300px',
        minWidth: '200px',
        overflowY: 'auto',
        position: 'absolute',
        zIndex: 3,
        backgroundColor: SUBTLE_WHITE,
        padding: '0px',
        margin: 0,
    },

    dropdownOptions: {
        display: 'flex',
        alignItems: 'center',
        margin: '2px',
        padding: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        $nest: {
            '&:hover': {
                backgroundColor: '#b3d6c6',
            },
            '&:first-child': { borderTopLeftRadius: 4, borderTopRightRadius: 4 },
            '&:last-child': { borderBottomLeftRadius: 4, borderBottomRightRadius: 4 },
        },
    },
    oddOption: {
        backgroundColor: 'white',
    },
    optionsNotSelected: {
        $nest: {
            '& > *': { marginLeft: '24px' },
        },
    },

    selectedOptionIcon: {
        color: MAIN_COLOR,
        margin: 'auto 0',
        flexShrink: 0,
        marginRight: '12px',
    },
});

type OutsideClickWrapperProps = {
    children: React.ReactNode;
    onOutsideClick: () => void;
};

function OutsideClickWrapper({ children, onOutsideClick }: OutsideClickWrapperProps): ReactElement {
    const wrapperRef = useRef<null | HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (
                wrapperRef.current !== null &&
                event.target instanceof Node &&
                !wrapperRef.current.contains(event.target)
            ) {
                onOutsideClick();
            }
        }

        document.addEventListener('mousedown', (e) => handleClickOutside(e));
        return () => {
            document.removeEventListener('mousedown', (e) => handleClickOutside(e));
        };
    }, [wrapperRef, onOutsideClick]);

    return <div ref={wrapperRef}>{children}</div>;
}
type DropdownProps = {
    title: string;
    items: string[];
    setSelectedFilter: (filter: string) => void;
    selectedFilter: string;
    className?: string;
    id?: string;
    onChange?: (item: string) => void;
    values?: [];
    showToggle?: boolean;
};
export function Dropdown({
    items,
    className,
    onChange,
    selectedFilter,
    setSelectedFilter,
}: DropdownProps): ReactElement {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    function handleOnClick(item: string): void {
        if (selectedFilter !== item) {
            setSelectedFilter(item);
        } else {
            setSelectedFilter('');
        }
    }

    function isItemInSelection(item: string): boolean {
        return selectedFilter === item;
    }

    return (
        <div className={classes(styles.dropdownWrapper, className)}>
            <OutsideClickWrapper onOutsideClick={() => setOpen(false)}>
                <div className={styles.dropdownButtonIcon} onClick={() => setOpen(!open)}>
                    <input
                        type={'text'}
                        value={searchInput}
                        onChange={(e) => open && setSearchInput(e.target.value)}
                        autoComplete={'off'}
                        className={styles.searchInput}
                    />
                    {open ? (
                        <FontAwesomeIcon icon={faArrowUp} className={style({ color: 'white' })} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowDown} className={style({ color: 'white' })} />
                    )}
                </div>
                {open && (
                    <ul className={styles.list}>
                        {items
                            .filter((item) => item.toLowerCase().includes(searchInput.toLowerCase()))
                            .sort((a, b) => a.localeCompare(b))
                            .map((item, index) => {
                                return (
                                    <div
                                        className={classes(
                                            styles.dropdownOptions,
                                            !isItemInSelection(item) && styles.optionsNotSelected,
                                            index % 2 === 1 && styles.oddOption
                                        )}
                                        key={item}
                                        onClick={() => {
                                            if (onChange) onChange(item);
                                            handleOnClick(item);
                                        }}
                                    >
                                        {isItemInSelection(item) ? (
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className={styles.selectedOptionIcon}
                                            />
                                        ) : null}

                                        <span>{item}</span>
                                    </div>
                                );
                            })}
                    </ul>
                )}
            </OutsideClickWrapper>
        </div>
    );
}
