import axiosInstance from "../../utils/axios";

export async function addPayment(payload: any) {
  const res = await axiosInstance.post("/payment/add", payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function clearCartServer() {
  const res = await axiosInstance.post(
    "/cart/clear",
    {},
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
}
