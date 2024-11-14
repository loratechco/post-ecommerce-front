import axios from "axios";

interface Fetch {
    endPiont: string;
    data: object;
    BEARER_TOKEN: string | null;
}

const API_BACEND: string = 'https://post-eco-api.liara.run';

const getData = async ({ endPiont, BEARER_TOKEN }: Omit<Fetch, "data">) => {
    try {

        const response = await fetch(`${API_BACEND}/${endPiont}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response?.ok)
            throw ({
                textError: response.statusText,
                statusCode: response.status
            });

        const data = await response?.json();
        return data;

    } catch (error) {
        return error;
    }
}

const postData = async ({ endPiont, BEARER_TOKEN, data }: Fetch) => {
    try {
        const response = await axios.post(`${API_BACEND}/${endPiont}`, data, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
            withCredentials: true, // برای ارسال کوکی‌ها و credentialها
        });

        return response.data; // بازگرداندن نتیجه‌ی JSON مستقیماً از axios

    } catch (error) {
        return error;
    }
};

const putData = async ({ endPiont, BEARER_TOKEN, data }: Fetch) => {
    try {
        const response = await fetch(`${API_BACEND}/${endPiont}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok)
            throw ({
                textError: response.statusText,
                statusCode: response.status
            });

        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}

const deleteData = async ({ endPiont, BEARER_TOKEN }: Omit<Fetch, "data">) => {
    try {
        const response = await fetch(`${API_BACEND}/${endPiont}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok)
            throw ({
                textError: response.statusText,
                statusCode: response.status
            });

        const result = await response.json();
        return result;

    } catch (error) {
        return error;
    }
}


export { getData, postData, putData, deleteData };