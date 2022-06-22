import axios from 'axios';

export async function login({
    loginData,
}: {
    loginData: {
        email: string;
        password: string;
    };
}) {
    return await axios.post('api/users/login', loginData);
}
export async function register({
    registerData,
}: {
    registerData: {
        name: string;
        email: string;
        password: string;
    };
}) {
    return await axios.post('api/users/', registerData);
}
export async function getCurrentUser() {
    return await axios.get('api/users/me');
}
export async function getCompanies() {
    return await axios.get('api/company');
}
export async function createCompany({
    companyData,
}: {
    companyData: {
        name: string;
        city: string;
        speciality: string;
    };
}) {
    return await axios.post('api/company', companyData);
}
