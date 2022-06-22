export type AxiosErrorWithMessage = {
    response: {
        data: {
            message: string;
        };
    };
};
export type Company = {
    name: string;
    city: string;
    speciality: string;
};
