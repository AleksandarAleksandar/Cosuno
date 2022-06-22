import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import React from 'react';
import { login } from '../resources';
import { AxiosErrorWithMessage } from './common';
import { Button } from '../utils/Button';
import { classes, stylesheet } from 'typestyle';
import { INPUT_FIELD } from '../utils/constants';

const styles = stylesheet({
    loginForm: {
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

type LoginProps = {
    setUser: (user: { name: string } | null) => void;
    setShowLogin: () => void;
};
export function Login({ setUser, setShowLogin }: LoginProps) {
    const [{ email, password }, setFormData] = useState({
        email: '',
        password: '',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await login({ loginData: { email, password } });
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setShowLogin();
            toast('Welcome ' + response.data.name, {
                position: 'top-center',
                autoClose: 1500,
                closeOnClick: true,
                hideProgressBar: true,
            });
        } catch (e) {
            const error = e as AxiosErrorWithMessage;
            toast.error(error.response.data.message, {
                position: 'top-right',
                autoClose: 1500,
                closeOnClick: true,
                hideProgressBar: true,
            });
        }
    };

    return (
        <>
            <section className="form">
                <form onSubmit={onSubmit} className={styles.loginForm}>
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

                    <div className={styles.buttons}>
                        <Button type="submit" title={'Submit'} />
                        <Button
                            type={'button'}
                            onClick={() => {
                                setShowLogin();
                            }}
                            title={'Cancel'}
                        />
                    </div>
                </form>
            </section>
        </>
    );
}
