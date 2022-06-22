import React, { useEffect, useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { stylesheet } from 'typestyle';
import { Button } from '../utils/Button';

const styles = stylesheet({
    header: {
        marginBottom: '2rem',
    },
    loginRegister: {
        display: 'flex',
        justifyContent: 'end',
        $nest: {
            '& > *:first-child': {
                marginRight: '1rem',
            },
        },
    },
    loginInfoAddComp: {
        display: 'flex',
    },
    loginInfo: {
        display: 'flex',
        marginLeft: 'auto',
    },
    user: {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.5rem',
        marginRight: '1rem',
    },
});

export function Header() {
    const [user, setUser] = useState<{ name: string } | null>();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const navigator = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userFromLocalStorage);
    }, [setUser]);

    return (
        <div className={styles.header}>
            {user === null ? (
                <div className={styles.loginRegister}>
                    <Button
                        onClick={() => {
                            setShowLogin(true);
                            setShowRegister(false);
                        }}
                        title={'Login'}
                    />
                    <Button
                        onClick={() => {
                            setShowRegister(true);
                            setShowLogin(false);
                        }}
                        title={'Register'}
                    />
                </div>
            ) : (
                <div className={styles.loginInfoAddComp}>
                    {location.pathname !== '/addCompany' && (
                        <Button
                            onClick={() => {
                                navigator('/addCompany');
                            }}
                            title={'Add company'}
                        />
                    )}
                    <div className={styles.loginInfo}>
                        <span className={styles.user}>{user?.name}</span>
                        <Button
                            onClick={() => {
                                toast('Goodbye ' + user?.name, {
                                    position: 'top-center',
                                    hideProgressBar: true,
                                });
                                localStorage.removeItem('user');
                                setUser(null);
                            }}
                            title={'Logout'}
                        />
                    </div>
                </div>
            )}
            {showLogin && <Login setUser={setUser} setShowLogin={() => setShowLogin(false)} />}
            {showRegister && (
                <Register setUser={setUser} setShowRegister={() => setShowRegister(false)} />
            )}
        </div>
    );
}
