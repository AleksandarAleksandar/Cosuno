import React, { FormEvent } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { register } from '../resources';
import { AxiosErrorWithMessage } from './common';
import { classes, stylesheet } from 'typestyle';
import { INPUT_FIELD } from '../utils/constants';
import { Button } from '../utils/Button';

const styles = stylesheet({
    registerForm: {
        $nest: {
            '& > *': {
                padding: '0.2rem',
            },
        },
    },
    inputField: {
        width: '10rem',
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

type RegisterProps = {
    setUser: (user: { name: string } | null) => void;
    setShowRegister: () => void;
};
export function Register({ setUser, setShowRegister }: RegisterProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password,
            };
            register({ registerData: userData })
                .then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setUser(response.data);
                    setShowRegister();
                    toast.success('Welcome ' + response.data.name, {
                        position: 'top-center',
                        autoClose: 1500,
                        closeOnClick: true,
                        hideProgressBar: true,
                    });
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
        }
    };

    return (
        <>
            <section>
                <form onSubmit={onSubmit} className={styles.registerForm}>
                    <div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange}
                            className={classes(INPUT_FIELD, styles.inputField)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange}
                            className={classes(INPUT_FIELD, styles.inputField)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={onChange}
                            className={classes(INPUT_FIELD, styles.inputField)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
                            onChange={onChange}
                            className={classes(INPUT_FIELD, styles.inputField)}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button type="submit" title={'Submit'} />
                        <Button
                            type={'button'}
                            onClick={() => {
                                setShowRegister();
                            }}
                            title={'Cancel'}
                        />
                    </div>
                </form>
            </section>
        </>
    );
}
