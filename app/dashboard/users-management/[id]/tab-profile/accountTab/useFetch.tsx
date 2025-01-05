//GET DATA

import { API_Backend } from "@/hooks/use-fetch";
import axios from "axios";

const getUserAccount = async (userToken) => {
  try {
    const res = await axios.get(`${API_Backend}/api/profile`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (res?.status >= 200 && res?.status < 300) {
      return res?.data;
    }
  } catch (error: any) {
    console.log("🚀 ~ getUserAccount ~ error:", error);
    return error?.response?.data?.message;
  }
};

export { getUserAccount };
