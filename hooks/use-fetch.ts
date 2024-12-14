'use client'

import { useEffect, useState } from "react";

interface UseFetchProps {
    endpoint: string;
    token: string;
    customErrorMessage?: string;
}

interface UseFetchResult {
    data: any | null;
    errorMessage: string | null;
    loading: boolean;
}

export const API_Backend = 'http://app.api';

const checkeEndPoint = (endpoint: string) => {
    // Endpoint should not start with slash and http.
    const regex = /^(\/|https?:\/\/)/;

    if (regex.test(endpoint)) {
        console.error(
            "FileName: apiHandler",
            "Endpoint should not start with slash(/) and http.",
            'Guide ====> The endpoint should be like this: (api/groups)'
        );
        return { ok: false, endpoint };
    }
    return { ok: true, endpoint };
};

export const useGEt = ({
    endpoint,
    token,
    customErrorMessage,
}: UseFetchProps): UseFetchResult => {
    const [data, setData] = useState<any | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            // Validate endpoint before fetching
            const endpointResult = checkeEndPoint(endpoint);
            if (!endpointResult.ok) return;
            setLoading(true);
            setErrorMessage(null);

            try {
                const response = await fetch(`${API_Backend}/${endpointResult.endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        customErrorMessage || 'Error receiving information, please try again'
                    );
                }

                const result = await response.json();
                setData(result);
            } catch (error: any) {
                setErrorMessage(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, token]);

    return { data, errorMessage, loading };
};
