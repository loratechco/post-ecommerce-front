import axios from "axios";

interface Fetch {
    endPiont: string;
    data: object;
    BEARER_TOKEN: string;
}

const API_BACEND = '';

const getData = async ({ endPiont, BEARER_TOKEN }: Omit<Fetch, "data">) => {
    try {
        const res = await axios.get(`${API_BACEND}/${endPiont}`, {
            headers: {
                'Authorization': `Bearer ${resultTOKEN}`
            }
        });
        if (res.status !== 200)
            throw ({ textError: res.statusText, statusCode: res.status });

        return res;

    } catch (error) {
        return error;
    }
}

const postData = async ({ endPiont, BEARER_TOKEN, data }: Fetch) => {
    try {
        const res = await axios.post(`${API_BACEND}/${endPiont}`, {

            headers: {
                'Authorization': `Bearer ${resultTOKEN}`
            },
            ...data
        });

        if (res.status !== 200)
            throw ({ textError: res.statusText, statusCode: res.status });

        return res;

    } catch (error) {
        return error;
    }
}

const putData = async ({ endPiont, BEARER_TOKEN, data }: Fetch) => {
    try {
        const res = await axios.put(`${API_BACEND}/${endPiont}`, {
            headers: {
                'Authorization': `Bearer ${resultTOKEN}`
            },
            ...data
        });

        if (res.status !== 200)
            throw ({ textError: res.statusText, statusCode: res.status });

        return res;

    } catch (error) {
        return error;
    }
}

export { API_BACEND, getData, postData, putData };