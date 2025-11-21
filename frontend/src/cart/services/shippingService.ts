import axiosInstance from "../../utils/axios";

export async function addShipping(payload: any) {
  const res = await axiosInstance.post("shipping/add", payload, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
}

export async function getShipping() {
  const res = await axiosInstance.get("shipping", {
    withCredentials: true,
  });
  return res.data;
}
