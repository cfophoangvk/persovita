import axiosInstance from "../../utils/axios";

export async function createOrder(payload: any) {
  const res = await axiosInstance.post("/orders/create", payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
}

export async function getOrders() {
  const res = await axiosInstance.get("/orders/", {
    withCredentials: true,
  });
  return res.data;
}
