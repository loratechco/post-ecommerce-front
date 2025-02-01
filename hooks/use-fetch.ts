'use client'
import { useEffect, useState } from "react";

interface UseFetchProps {
    endpoint: string;
    token?: string;
    customErrorMessage?: string;
    dependencyOptional?: any;
    tokenIsavailable?: boolean;
}

interface UseFetchResult {
    data: any | null;
    errorMessage: string | null;
    loading: boolean;
}

export const API_Backend = 'https://postapi.liara.run';

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
    tokenIsavailable = true,
    customErrorMessage,
    dependencyOptional = null,
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
                const response = await fetch(`${API_Backend}/${endpointResult?.endpoint}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        ...(tokenIsavailable && { Authorization: `Bearer ${token}` }),
                    },
                });
                // console.info('response=>>>>>>', response, 'response and Json parse=====>', await response.json());

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
    }, [endpoint, token, dependencyOptional]);

    return { data, errorMessage, loading };
};
