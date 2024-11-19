//GET DATA

import axios from "axios";

const getUserAccount = async (userToken) => {
    try {
        const res = await axios.get("http://app.api/api/profile", {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        if (res?.status >= 200 && res?.status < 300) {
            return res?.data;
        }
    } catch (error) {

        console.log("🚀 ~ getUserAccount ~ error:", error)
        return error?.response?.data?.message;
    }
}

export { getUserAccount }