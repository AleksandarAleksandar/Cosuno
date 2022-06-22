import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Dashboard } from './views/Dashboard';
import { Header } from './views/Header';
import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';
import { getCompanies } from './resources';
import { CompanyForm } from './views/CompanyForm';
import { stylesheet } from 'typestyle';
import { Company } from './views/common';

const styles = stylesheet({
    page: {
        padding: '1em',
    },
});
function App() {
    const [companies, setCompanies] = useState<Company[]>();
    useEffect(() => {
        getCompanies().then(
            (
                r: AxiosResponse<{
                    companies: { name: string; city: string; speciality: string }[];
                }>
            ) => {
                setCompanies(r.data.companies);
            }
        );
    }, []);
    return (
        <>
            <Router>
                <div className={styles.page}>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard companies={companies} />} />
                        <Route
                            path="/addCompany"
                            element={<CompanyForm setCompanies={setCompanies} />}
                        />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
