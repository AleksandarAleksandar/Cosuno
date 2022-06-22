import React, { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { createCompany, getCompanies } from '../resources';
import { AxiosErrorWithMessage, Company } from './common';
import { useNavigate } from 'react-router-dom';
import { classes, stylesheet } from 'typestyle';
import { INPUT_FIELD } from '../utils/constants';
import { Button } from '../utils/Button';

const styles = stylesheet({
    addCompFrom: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        $nest: {
            '& > *': {
                padding: '0.5rem',
            },
        },
    },
    inputField: {
        width: '20rem',
    },
    buttons: {
        display: 'flex',
        $nest: {
            '& > *:first-child': {
                marginRight: '.5rem',
            },
        },
    },
});
type CompanyFormProps = {
    setCompanies: (company: Company[]) => void;
};

export function CompanyForm({ setCompanies }: CompanyFormProps) {
    const [{ name, city, speciality }, setFormData] = useState({
        name: '',
        city: '',
        speciality: '',
    });

    const navigator = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (name.length === 0 || city.length === 0 || speciality.length === 0) {
            toast.error('Please make sure all fields have required information', {
                position: 'top-right',
                autoClose: 1500,
                closeOnClick: true,
                hideProgressBar: true,
            });
            return;
        }

        const companyData = {
            name,
            city,
            speciality,
        };
        createCompany({ companyData })
            .then((response) => {
                toast.success('You have created a company ' + response.data.name, {
                    position: 'top-center',
                    autoClose: 1500,
                    closeOnClick: true,
                    hideProgressBar: true,
                });
                setFormData({ name: '', speciality: '', city: '' });
                getCompanies().then((companies) => setCompanies(companies.data.companies));
            })
            .catch((e) => {
                const error = e as AxiosErrorWithMessage;
                toast.error(error.response.data.message, {
                    position: 'top-right',
                    autoClose: 1500,
                    closeOnClick: true,
                    hideProgressBar: true,
                });
            });
    };
    //todo abstract away input fields into something more generic
    return (
        <form className={styles.addCompFrom} onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter company name"
                    onChange={onChange}
                    className={classes(INPUT_FIELD, styles.inputField)}
                />
            </div>
            <div>
                <input
                    type="city"
                    id="city"
                    name="city"
                    value={city}
                    placeholder="Enter your city"
                    onChange={onChange}
                    className={classes(INPUT_FIELD, styles.inputField)}
                />
            </div>
            <div>
                <input
                    type="speciality"
                    id="speciality"
                    name="speciality"
                    value={speciality}
                    placeholder="Enter speciality"
                    onChange={onChange}
                    className={classes(INPUT_FIELD, styles.inputField)}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="submit" title={'Submit'} />
                <Button
                    type={'button'}
                    onClick={() => {
                        navigator('/');
                    }}
                    title={'Cancel'}
                />
            </div>
        </form>
    );
}
