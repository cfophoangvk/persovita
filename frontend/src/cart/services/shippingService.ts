import type { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axios";

async function handleResponse(res: AxiosResponse) {
  if (res.status === 401) {
    window.location.href = "/login";
    return { success: false, message: "Unauthorized" };
  }
  return res.data;
}

export async function addShipping(payload: any) {
  const res = await axiosInstance.post("shipping/add", payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  });
  return handleResponse(res);
}

export async function getShipping() {
  const res = await axiosInstance.get("shipping", {
    withCredentials: true,
  });
  return handleResponse(res);
}
