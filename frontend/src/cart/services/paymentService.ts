import type { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axios";

async function handleResponse(res: AxiosResponse) {
  if (res.status === 401) {
    window.location.href = "/login";
    return { success: false, message: "Unauthorized" };
  }
  return res.data;
}

export async function addPayment(payload: any) {
  const res = await axiosInstance.post("/payment/add", payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  });
  return handleResponse(res);
}

export async function clearCartServer() {
  const res = await axiosInstance.post("/cart/clear", {}, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  });
  return handleResponse(res);
}
