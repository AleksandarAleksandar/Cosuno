import React, { useState } from 'react';
import { classes, stylesheet } from 'typestyle';
import { Dropdown } from '../utils/Dropdown';
import { BORDER_INACTIVE, SUBTLE_WHITE } from '../utils/constants';
import { TextInput } from '../utils/TextInput';

const styles = stylesheet({
    dashboardPage: {
        display: 'flex',
    },
    dashboardList: {
        display: 'flex',
        width: '75%',
        flexDirection: 'column',
        fontSize: '1.5rem',
        border: `1px solid ${BORDER_INACTIVE}`,
        borderRadius: '4px',
        padding: '1rem',
        marginRight: '.5rem',
        $nest: {
            '& > *': {
                padding: '0.5rem',
            },
        },
    },
    header: {
        fontSize: '1rem',
        $nest: {
            '& > *:first-child': {
                marginLeft: '1rem',
            },
        },
    },
    company: {},
    gridLayout: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr) ',
        alignItems: 'center',
    },
    filters: {
        display: 'flex',
        marginLeft: 'auto',
        $nest: {
            '& > *:first-child': {
                marginRight: '.5rem',
            },
        },
    },
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

type DashboardProps = {
    companies: { name: string; city: string; speciality: string }[] | undefined;
};

export function Dashboard({ companies }: DashboardProps) {
    const specialities = ['Excavation', 'Plumbing', 'Electrical', 'Sewage', 'Demolish'];
    //todo add a spinner
    const [searchInput, setSearchInput] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('');

    if (!companies) return <div>Spinner spins</div>;

    if (companies.length === 0) return <div>No companies</div>;

    console.log();

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.dashboardList}>
                <header className={classes(styles.gridLayout, styles.header)}>
                    <span></span>
                    <span>Name</span>
                    <span>City</span>
                    <span>Speciality</span>
                </header>
                {companies
                    .filter((company) =>
                        company.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
                    )
                    .filter((company) =>
                        company.speciality
                            .toLocaleLowerCase()
                            .includes(selectedFilter.toLocaleLowerCase())
                    )
                    .map((company, i) => {
                        return (
                            <div key={company.name} className={styles.gridLayout}>
                                <img
                                    src={`https://lorempokemon.fakerapi.it/pokemon/100/${i}`}
                                    alt={'image placeholder'}
                                />
                                <span>{company.name}</span>
                                <span>{company.city}</span>
                                <span>{company.speciality}</span>
                            </div>
                        );
                    })}
            </div>
            <div className={styles.filters}>
                <TextInput
                    placeholder={'Filter companies'}
                    value={searchInput}
                    setValue={setSearchInput}
                />
                <Dropdown
                    items={specialities}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    title={'Select filter'}
                />
            </div>
        </div>
    );
}
