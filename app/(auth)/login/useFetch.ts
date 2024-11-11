import axios from "axios";

interface Props {
    email: string,
    password: string
}

async function useFetch({ email, password }: Props) {

    const saveSession = (token: string) => {
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);  //30 days
        const expiresUTC = expires.toUTCString();

        // ایجاد کوکی با ویژگی‌های امنیتی
        document.cookie =
        `token=${token};
         path=/;
         expires=${expiresUTC};
         secure=${process.env.NODE_ENV === "production" ? "true" : "false"};
         SameSite=Strict`;
    };

    try {
        const response = await axios.post("https://post-eco-api.liara.run/api/login", { email, password });

        if (response.status !== 200)
            throw new Error("Login failed");

        const { token } = response.data;
        if (!token)
            throw new Error("No token received");

        saveSession(token);
        if (token) {
            window.location.href = "/dashboard";
        }

    } catch (error) {
        return axios.isAxiosError(error);
    }

}

export default useFetch;