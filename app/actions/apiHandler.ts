'use server'
const API_URL = 'http://app.api';

const checkeEndPoint = (endpoint: string) => {
    // Endpoint should not start with slash and http.
    const regex = /^(\/|https?:\/\/)/;

    if (regex.test(endpoint)) {
        console.error(
            "FileName: apiHandler",
            "Endpoint should not start with slash(/) and http.",
            'Guide ====>The endpoint should be like this:(api/groups)'
        );
        return { ok: false, endpoint };
    }
    return { ok: true, endpoint };
}

export const getData = async (
    endpoint: string,
    token: string,
    customErrorMessage?: string
): Promise<{
    res: any;
    errorMessage: string | null;
} | any> => {
    try {
        const endpointResult = checkeEndPoint(endpoint);
        if (!endpointResult.ok) return;

        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            console.info(response);
            throw `${customErrorMessage || 'Error receiving information, please try again'}`
        };

        const resutl = await response.json();
        return {
            res: resutl,
            errorMessage: null,
        };
    } catch (error) {
        console.error(error);
        return {
            res: error,
            errorMessage: error as string,
        };
    }
}

